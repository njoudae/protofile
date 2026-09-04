import sections from "../sections.json";

type Env = {
  AI: Ai;
  VECTORIZE: VectorizeIndex;
  OPENAI_API_KEY: string;
};

type Section = {
  chunk_id: number;
  metadata: {
    section: string;
    subsection?: string;
  };
  content: string;
};

type EmbeddingResponse = {
  shape?: number[];
  data?: number[][];
};

const EMBEDDING_MODEL = "@cf/baai/bge-m3";
const OPENAI_MODEL = "gpt-5.6-luna";

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // =========================================================
    // Health
    // =========================================================
    if (url.pathname === "/health" && request.method === "GET") {
      return jsonResponse({
        status: "ok",
        embedding_model: EMBEDDING_MODEL,
        generation_model: OPENAI_MODEL,
        retrieval_top_k: 5,
        ai: Boolean(env.AI),
        vectorize: Boolean(env.VECTORIZE),
      });
    }

    // =========================================================
    // Production RAG Chat
    // =========================================================
    if (url.pathname === "/api/chat" && request.method === "POST") {
      try {
        const body = (await request.json()) as {
          question?: unknown;
        };

        if (typeof body.question !== "string") {
          return jsonResponse(
            { error: "Question must be a string." },
            400,
          );
        }

        const question = body.question.trim();

        if (!question) {
          return jsonResponse(
            { error: "Question is required." },
            400,
          );
        }

        if (question.length > 300) {
          return jsonResponse(
            { error: "Question is too long." },
            400,
          );
        }

        // -----------------------------------------------------
        // 1. Generate query embedding using BGE-M3
        // -----------------------------------------------------
        const embeddingResult = (await env.AI.run(
          EMBEDDING_MODEL,
          {
            text: [question],
          },
        )) as EmbeddingResponse;

        const queryVector = embeddingResult.data?.[0];

        if (!queryVector) {
          throw new Error("Failed to generate query embedding.");
        }

        // -----------------------------------------------------
        // 2. Dense retrieval — Top 5
        // -----------------------------------------------------
        const retrieval = await env.VECTORIZE.query(queryVector, {
          topK: 5,
          returnMetadata: "all",
        });

        if (!retrieval.matches?.length) {
          return jsonResponse({
            answer:
              "I couldn't find enough information in Nejood's profile to answer that question.",
          });
        }

        // -----------------------------------------------------
        // 3. Build RAG context
        // -----------------------------------------------------
        const context = retrieval.matches
          .map((match, index) => {
            const section = String(
              match.metadata?.section ?? "",
            );

            const subsection = String(
              match.metadata?.subsection ?? "",
            );

            const content = String(
              match.metadata?.content ?? "",
            );

            return [
              `[Context ${index + 1}]`,
              section ? `Section: ${section}` : "",
              subsection ? `Subsection: ${subsection}` : "",
              content,
            ]
              .filter(Boolean)
              .join("\n");
          })
          .join("\n\n");

        // -----------------------------------------------------
        // 4. GPT-5-mini generation
        // -----------------------------------------------------
        const openAIResponse = await fetch(
          "https://api.openai.com/v1/responses",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${env.OPENAI_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: OPENAI_MODEL,

              instructions: `
You are Nejood Bin Eshaq's professional portfolio assistant.

Your job is to answer questions about Nejood using ONLY the profile context provided to you.

Rules:
0. If the question is not related to Nejood's profile, politely decline to answer.
1. Use only information explicitly supported by the provided context.
2. Never invent, assume, infer, or complete missing personal or professional information.
3. Answer in the same language as the user's question.
4. Keep answers concise, clear, friendly, and professional.
5. Answer the user's actual question directly. Do not mention retrieval, chunks, embeddings, context numbers, or internal system details.
6. When multiple provided contexts are relevant, combine them into one coherent answer.
7. Do not include unrelated information simply because it appears in the context.
8. If the requested information is not available or is not sufficiently supported by the context, clearly say that the information is not available in Nejood's profile.
9. When information is unavailable, you may direct the user to contact Nejood at njoodeshaq@gmail.com for further information.
10. Do not treat absence of information as evidence that something is false.
11. For broad questions about Nejood, her experience, skills, projects, education, or achievements, summarize all relevant information available in the provided context.
              `.trim(),

              input: `
PROFILE CONTEXT:

${context}

USER QUESTION:

${question}
              `.trim(),

              reasoning: {
                effort: "none",
              },

              text: {
                verbosity: "low",
              },

              max_output_tokens: 300,
            }),
          },
        );

        if (!openAIResponse.ok) {
          const errorText = await openAIResponse.text();

          console.error(
            "OpenAI API error:",
            openAIResponse.status,
            errorText,
          );

          throw new Error(
            `OpenAI API request failed: ${openAIResponse.status}`,
          );
        }

        const openAIData = (await openAIResponse.json()) as {
          output?: Array<{
            content?: Array<{
              type?: string;
              text?: string;
            }>;
          }>;
        };

        // -----------------------------------------------------
        // 5. Extract final text
        // -----------------------------------------------------
        const answer = openAIData.output
          ?.flatMap((item) => item.content ?? [])
          .find(
            (item) =>
              item.type === "output_text" &&
              typeof item.text === "string",
          )
          ?.text?.trim();

        if (!answer) {
          throw new Error("OpenAI returned an empty answer.");
        }

        return jsonResponse({
          answer,
        });
      } catch (error) {
        console.error("Chat error:", error);

        return jsonResponse(
          {
            error: "Failed to generate an answer.",
          },
          500,
        );
      }
    }

    // =========================================================
    // Temporary indexing endpoint
    // Run only when profile data changes.
    // Remove before final production release.
    // =========================================================
    if (
      url.pathname === "/index-profile" &&
      request.method === "POST"
    ) {
      try {
        const chunks = sections as Section[];

        const texts = chunks.map((chunk) =>
          [
            chunk.metadata.section,
            chunk.metadata.subsection,
            chunk.content,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const embeddingResult = (await env.AI.run(
          EMBEDDING_MODEL,
          {
            text: texts,
          },
        )) as EmbeddingResponse;

        if (
          !embeddingResult.data ||
          embeddingResult.data.length !== chunks.length
        ) {
          throw new Error(
            "Embedding count does not match chunk count.",
          );
        }

        const vectors: VectorizeVector[] = chunks.map(
          (chunk, index) => ({
            id: String(chunk.chunk_id),

            values: embeddingResult.data![index],

            metadata: {
              section: chunk.metadata.section,
              subsection: chunk.metadata.subsection ?? "",
              content: chunk.content,
            },
          }),
        );

        await env.VECTORIZE.upsert(vectors);

        return jsonResponse({
          status: "indexed",
          chunks: vectors.length,
          model: EMBEDDING_MODEL,
          dimensions: embeddingResult.data[0]?.length ?? null,
        });
      } catch (error) {
        console.error("Indexing error:", error);

        return jsonResponse(
          {
            error: "Failed to index profile.",
          },
          500,
        );
      }
    }

    // =========================================================
    // 404
    // =========================================================
    return jsonResponse(
      {
        error: "Not found.",
      },
      404,
    );
  },
} satisfies ExportedHandler<Env>;