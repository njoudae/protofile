from src.ingestion.chunker import load_markdown_sections
from src.embeddings.e5 import get_embedding_model
from src.vectorstore.chroma_store import create_vector_store


PROFILE_PATH = "data/profile.md"


def main():

    # 1. Chunk Markdown
    print("Loading and chunking profile...")

    chunks = load_markdown_sections(PROFILE_PATH)

    print(f"Chunks: {len(chunks)}")

    # 2. Load E5
    print("Loading E5...")

    embedding_model = get_embedding_model()

    # 3. Store chunks + embeddings in Chroma
    print("Creating Chroma vector store...")

    create_vector_store(
        chunks=chunks,
        embedding_model=embedding_model,
    )

    print("Done.")
    print("Vector store saved to data/chroma_db")


if __name__ == "__main__":
    main()