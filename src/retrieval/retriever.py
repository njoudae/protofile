from src.embeddings.e5 import get_embedding_model
from src.vectorstore.chroma_store import load_vector_store


TOP_K = 5


embedding_model = get_embedding_model()

vector_store = load_vector_store(
    embedding_model=embedding_model
)


def retrieve(query: str):

    results = vector_store.similarity_search_with_score(
        query,
        k=TOP_K,
    )

    return results


if __name__ == "__main__":

    query = "هل لديها مشاريع RAG؟"

    results = retrieve(query)

    print(f"\nQuery: {query}\n")

    for i, (document, score) in enumerate(results, start=1):

        print("=" * 80)
        print("RANK:", i)
        print("SCORE:", score)
        print("METADATA:", document.metadata)
        print("CONTENT:", document.page_content)
        print()