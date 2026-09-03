from langchain_huggingface import HuggingFaceEmbeddings


MODEL_NAME = "intfloat/multilingual-e5-large"


class E5Embeddings(HuggingFaceEmbeddings):
    """
    E5 embedding model.

    Documents -> passage:
    Queries   -> query:
    """

    def embed_documents(self, texts):
        prefixed_texts = [
            f"passage: {text}"
            for text in texts
        ]

        return super().embed_documents(prefixed_texts)

    def embed_query(self, text):
        return super().embed_query(
            f"query: {text}"
        )


def get_embedding_model():
    return E5Embeddings(
        model_name=MODEL_NAME,
        encode_kwargs={
            "normalize_embeddings": True,
            "batch_size": 32,
        },
    )