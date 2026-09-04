# RAG-Protofile

A bilingual Arabic-English Retrieval-Augmented Generation (RAG) system integrated into my personal portfolio to answer questions about my professional profile.

The project was developed and evaluated through two implementations:

1. **Local RAG Prototype** for experimentation and retrieval evaluation.
2. **Cloud Production RAG** optimized for lightweight deployment, multilingual retrieval, and low-latency portfolio usage.

---

## Local RAG Prototype

The initial implementation was developed locally to experiment with multilingual semantic retrieval and evaluate the RAG pipeline before deployment.

```text
Structured Markdown Profile
        ↓
Header-Based Chunking
        ↓
Multilingual E5-Large
        ↓
Chroma Vector Store
        ↓
Dense Semantic Retrieval
        ↓
GPT
        ↓
Grounded Response
```

### Local Implementation

- **Knowledge Base:** Structured Markdown professional profile
- **Chunking:** Header-aware chunking with section hierarchy preserved as metadata
- **Embedding Model:** `intfloat/multilingual-e5-large`
- **Vector Database:** Chroma
- **Retrieval:** Dense semantic retrieval
- **Generation:** OpenAI GPT model
- **Languages:** Arabic and English
- **Backend:** FastAPI

This environment was retained as the experimental and evaluation implementation of the project.

---

## Cloud Production Architecture

For production, the RAG pipeline was redesigned around Cloudflare's serverless AI infrastructure.

```text
Portfolio / Next.js
        ↓
Cloudflare Worker
        ↓
BGE-M3 Query Embedding
        ↓
Cloudflare Vectorize
        ↓
Dense Top-5 Retrieval
        ↓
GPT-5.6 Luna
        ↓
Grounded Response
```

### Production Stack

- **Frontend:** Next.js deployed on Vercel
- **RAG API:** Cloudflare Workers
- **Embedding Model:** `@cf/baai/bge-m3`
- **Vector Database:** Cloudflare Vectorize
- **Retrieval:** Dense semantic search with Top-5 retrieval
- **Generation:** GPT-5.6 Luna
- **Languages:** Arabic and English

The embedding model was changed from E5-Large to BGE-M3 because the production architecture uses models available through Cloudflare Workers AI. As a result, the profile chunks were re-embedded using BGE-M3 rather than reusing the original E5 vectors.

---

## Retrieval Evaluation

The production retrieval pipeline was evaluated using **32 Arabic questions**, with one expected profile chunk defined for each question.

Two retrieval configurations were compared:

1. **BGE-M3 dense retrieval**
2. **BGE-M3 dense retrieval + `bge-reranker-base`**

| Metric | BGE-M3 Dense | + Reranker |
|---|---:|---:|
| Top-1 | 40.6% | 40.6% |
| Top-3 | **75.0%** | 68.8% |
| Top-5 | **81.3%** | 78.1% |
| Top-10 | **96.9%** | 96.9% |
| MRR | **0.599** | 0.584 |

### Reranker Decision

The reranker was excluded from the final production pipeline.

Although it improved the ranking of some queries, it reduced overall Top-3, Top-5, and MRR performance and provided no improvement in Top-1 or Top-10 retrieval.

The final architecture therefore uses **BGE-M3 dense retrieval without reranking**.

---

## Why Top-5 in Production?

Dense retrieval achieved:

- **81.3% Top-5 retrieval**
- **96.9% Top-10 retrieval**

Top-10 provides higher candidate recall, but Top-5 was selected for the production portfolio to reduce the amount of retrieved context passed to the LLM, lowering token usage, latency, and irrelevant context.

Top-10 remains useful as an evaluation configuration and provides evidence that the dense retriever can locate the expected profile information for **31 of the 32 evaluated questions**.

The production configuration therefore prioritizes the trade-off between retrieval coverage and inference efficiency:

```text
BGE-M3 → Vectorize Top-5 → GPT-5.6 Luna
```

---

## Grounded Generation

Retrieved profile sections are provided to the LLM as context.

The generation layer is instructed to:

- answer only from retrieved profile information,
- respond in the same language as the user's question,
- combine relevant information across retrieved sections,
- avoid unsupported assumptions or hallucinations,
- keep responses concise and professional,
- state when requested information is unavailable.

For example, questions requesting information that does not exist in the profile, such as salary information, return an explicit unavailable-information response rather than generating an unsupported answer.

---

## Project Structure

```text
data/
├── profile.md
└── sections.json

src/
├── embeddings/
├── ingestion/
├── retrieval/
├── generation/
├── evaluation/
└── vectorstore/

backend/
└── Local FastAPI implementation

cloudflare-worker/
└── Production RAG API

app/
└── Next.js portfolio and chat API
```

---

## Final Production Pipeline

```text
User Question
      ↓
Next.js Portfolio
      ↓
Cloudflare Worker
      ↓
BGE-M3 Multilingual Embedding
      ↓
Cloudflare Vectorize
      ↓
Top-5 Dense Retrieval
      ↓
GPT-5.6 Luna
      ↓
Grounded Arabic / English Answer
```

This architecture keeps the local experimental pipeline available for retrieval research and evaluation while using a lightweight serverless architecture for the live portfolio.