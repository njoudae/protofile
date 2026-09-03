from pathlib import Path
import json

from langchain_text_splitters import MarkdownHeaderTextSplitter


def load_markdown_sections(file_path: str):

    text = Path(file_path).read_text(encoding="utf-8")

    headers_to_split_on = [
        ("#", "section"),
        ("##", "subsection"),
    ]

    splitter = MarkdownHeaderTextSplitter(
        headers_to_split_on=headers_to_split_on,
        strip_headers=True,
        return_each_line=False,
    )

    return splitter.split_text(text)


def save_chunks(chunks, output_path: str):

    data = []

    for i, chunk in enumerate(chunks, start=1):
        data.append({
            "chunk_id": i,
            "metadata": chunk.metadata,
            "content": chunk.page_content,
        })

    Path(output_path).write_text(
        json.dumps(data, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


if __name__ == "__main__":

    chunks = load_markdown_sections("data/profile.md")

    print(f"Total chunks: {len(chunks)}\n")

    for i, chunk in enumerate(chunks, start=1):
        print("=" * 80)
        print("CHUNK:", i)
        print("METADATA:", chunk.metadata)
        print("CONTENT:", chunk.page_content[:300])
        print()

    save_chunks(
        chunks,
        "data/sections.json",
    )

    print("Saved to data/sections.json")