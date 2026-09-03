from langchain_chroma import Chroma


PERSIST_DIRECTORY = "data/chroma_db"
COLLECTION_NAME = "nejood_profile"


def create_vector_store(chunks, embedding_model):

    db = Chroma.from_documents(
        documents=chunks,
        embedding=embedding_model,
        collection_name=COLLECTION_NAME,
        persist_directory=PERSIST_DIRECTORY,
    )

    return db


def load_vector_store(embedding_model):

    return Chroma(
        collection_name=COLLECTION_NAME,
        persist_directory=PERSIST_DIRECTORY,
        embedding_function=embedding_model,
    )