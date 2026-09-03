import os
import re
import time
import unicodedata

from dotenv import load_dotenv
from openai import OpenAI

from src.retrieval.retriever import retrieve


# =========================================================
# CONFIG
# =========================================================

CONTEXT_TOP_K = 5
QUESTION_MAX_LENGTH = 300

project_root = os.path.dirname(
    os.path.dirname(
        os.path.dirname(__file__)
    )
)


load_dotenv(
    os.path.join(project_root, ".env")
)

api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise ValueError(
        "OPENAI_API_KEY not found in environment variables."
    )

client = OpenAI(api_key=api_key)


# =========================================================
# TEXT NORMALIZATION
# =========================================================

def normalize_query(text):
    text = unicodedata.normalize("NFKC", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


# =========================================================
# BUILD CONTEXT
# =========================================================

def build_context(results):

    context_parts = []

    for i, (document, score) in enumerate(
        results[:CONTEXT_TOP_K],
        start=1
    ):

        section = document.metadata.get(
            "section",
            ""
        )

        subsection = document.metadata.get(
            "subsection",
            ""
        )

        header = " > ".join(
            value
            for value in [section, subsection]
            if value
        )

        context_parts.append(
            f"""
[Source {i}: {header}]

{document.page_content}
""".strip()
        )

    return "\n\n".join(context_parts)


# =========================================================
# GPT GENERATION
# =========================================================

SYSTEM_PROMPT = """
You are a friendly assistant answering questions about Nejood's professional profile.

Rules:
1. Answer using only the provided profile context. Do not add or assume unsupported information.
2. Use only the source or sources relevant to the question, combining information when needed.
3. Rephrase the information naturally in a friendly, human, and conversational way. Do not copy the source wording mechanically.
4. Answer concisely in the same language as the user without mentioning sources, retrieval, chunks, metadata, or internal processes.
5. If the context does not contain the necessary information to answer, say No information about that available. You can contact her via email: njoodeshaq@gmail.com.
6. The contact method is email only. Do not provide any other contact links.
""".strip()


def generate_answer(query, context):

    model = os.getenv(
        "OPENAI_MODEL",
        "gpt-5-mini"
    )

    response = client.chat.completions.create(
        model=model,

        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT
            },
            {
                "role": "user",
                "content": f"""
USER QUESTION:
{query}

PROFILE CONTEXT:
{context}
""".strip()
            }
        ],

        max_completion_tokens=800
    )

    choice = response.choices[0]

    answer = choice.message.content

    print(
        f"[GPT] finish_reason: "
        f"{choice.finish_reason}"
    )

    print(
        f"[GPT] usage: "
        f"{response.usage}"
    )

    if not answer:
        raise RuntimeError(
            "GPT returned an empty response."
        )

    return answer.strip()


# =========================================================
# FULL RAG PIPELINE
# =========================================================

def ask(query):

    total_start = time.perf_counter()

    # 1. Normalize
    query = normalize_query(query)

    if not query:
        raise ValueError(
            "Question cannot be empty."
        )

    if len(query) > QUESTION_MAX_LENGTH:
        raise ValueError(
            "Question exceeds 300 characters."
        )

    # 2. Retrieval
    retrieval_start = time.perf_counter()

    results = retrieve(query)

    retrieval_end = time.perf_counter()

    if not results:
        raise RuntimeError(
            "No documents were retrieved."
        )

    # 3. Build GPT context
    context = build_context(results)

    # 4. Generation
    generation_start = time.perf_counter()

    answer = generate_answer(
        query,
        context
    )

    generation_end = time.perf_counter()

    # 5. Latency
    retrieval_latency = (
        retrieval_end - retrieval_start
    )

    generation_latency = (
        generation_end - generation_start
    )

    total_latency = (
        generation_end - total_start
    )

    return {
        "answer": answer,
        "sources": results,
        "retrieval_latency": retrieval_latency,
        "generation_latency": generation_latency,
        "total_latency": total_latency,
    }


# =========================================================
# INTERACTIVE CHAT
# =========================================================

if __name__ == "__main__":

    print("=" * 70)
    print("NEJOOD PROFILE RAG")
    print("Pipeline: E5 -> Chroma -> Top 5 -> GPT-5-mini")
    print("Type 'exit' to stop.")
    print("=" * 70)

    while True:

        query = input("\nQuestion: ")

        if query.strip().lower() in {
            "exit",
            "quit",
        }:
            break

        if not query.strip():
            continue

        try:

            result = ask(query)

            print("\n" + "=" * 70)
            print("ANSWER")
            print("=" * 70)

            print(result["answer"])

            print("\nSources:")

            for i, (document, score) in enumerate(
                result["sources"],
                start=1
            ):

                section = document.metadata.get(
                    "section",
                    ""
                )

                subsection = document.metadata.get(
                    "subsection",
                    ""
                )

                title = " > ".join(
                    value
                    for value in [
                        section,
                        subsection
                    ]
                    if value
                )

                print(
                    f"- #{i} {title} "
                    f"(distance={score:.4f})"
                )

            print("\nLatency:")

            print(
                f"Retrieval  : "
                f"{result['retrieval_latency']:.3f}s"
            )

            print(
                f"Generation : "
                f"{result['generation_latency']:.3f}s"
            )

            print(
                f"TOTAL      : "
                f"{result['total_latency']:.3f}s"
            )

        except Exception as e:

            print(
                f"\nERROR: {e}"
            )