import json
import time
from pathlib import Path

from src.generation.rag_chat import ask


EVALUATION_PATH = "data/evaluation.json"
OUTPUT_PATH = "experiments/rag_evaluation.json"


def load_evaluation():
    return json.loads(
        Path(EVALUATION_PATH).read_text(
            encoding="utf-8"
        )
    )


def main():

    evaluation = load_evaluation()

    print("=" * 70)
    print("RAG END-TO-END EVALUATION")
    print("=" * 70)
    print(f"Questions: {len(evaluation)}\n")

    results = []

    for i, item in enumerate(
        evaluation,
        start=1
    ):

        query = item["query"]

        print("\n" + "=" * 70)
        print(
            f"[{i}/{len(evaluation)}] "
            f"{item['id']}"
        )
        print("=" * 70)

        print(f"\nQUESTION:\n{query}")

        try:

            start = time.perf_counter()

            result = ask(query)

            elapsed = time.perf_counter() - start

            print(
                f"\nANSWER:\n"
                f"{result['answer']}"
            )

            print("\nSOURCES:")

            sources = []

            for rank, (document, score) in enumerate(
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
                    f"{rank}. {title} "
                    f"(distance={score:.4f})"
                )

                sources.append({
                    "rank": rank,
                    "section": section,
                    "subsection": subsection,
                    "distance": score,
                })

            print(
                f"\nTOTAL LATENCY: "
                f"{elapsed:.3f}s"
            )

            results.append({
                "id": item["id"],
                "query": query,
                "language": item["language"],
                "answer": result["answer"],
                "sources": sources,
                "retrieval_latency":
                    result["retrieval_latency"],
                "generation_latency":
                    result["generation_latency"],
                "total_latency":
                    result["total_latency"],
            })

        except Exception as e:

            print(f"\nERROR: {e}")

            results.append({
                "id": item["id"],
                "query": query,
                "language": item["language"],
                "error": str(e),
            })

    # Save results
    output_path = Path(OUTPUT_PATH)

    output_path.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    output_path.write_text(
        json.dumps(
            results,
            ensure_ascii=False,
            indent=2
        ),
        encoding="utf-8"
    )

    successful = [
        result
        for result in results
        if "answer" in result
    ]

    if successful:

        avg_latency = sum(
            result["total_latency"]
            for result in successful
        ) / len(successful)

        print("\n" + "=" * 70)
        print("SUMMARY")
        print("=" * 70)

        print(
            f"Successful: "
            f"{len(successful)}/{len(results)}"
        )

        print(
            f"Average latency: "
            f"{avg_latency:.3f}s"
        )

    print(
        f"\nResults saved to: "
        f"{OUTPUT_PATH}"
    )


if __name__ == "__main__":
    main()