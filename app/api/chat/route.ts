import { NextRequest, NextResponse } from "next/server";

const MAX_INPUT_LENGTH = 300;

type RagApiResponse = {
  answer?: string;
  error?: string;
};

export async function POST(request: NextRequest) {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body." },
        { status: 400 }
      );
    }

    const question =
      typeof body === "object" &&
      body !== null &&
      "question" in body &&
      typeof (body as { question?: unknown }).question === "string"
        ? (body as { question: string }).question.trim()
        : "";

    if (!question) {
      return NextResponse.json(
        { error: "Invalid question." },
        { status: 400 }
      );
    }

    if (question.length > MAX_INPUT_LENGTH) {
      return NextResponse.json(
        { error: "Question exceeds 300 characters." },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${process.env.RAG_API_URL || "http://127.0.0.1:8000"}/api/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
        cache: "no-store",
      }
    );

    const payload = (await response
      .json()
      .catch(() => ({}))) as RagApiResponse;

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            typeof payload.error === "string"
              ? payload.error
              : "The service is temporarily unavailable.",
        },
        {
          status: response.status === 429 ? 429 : 500,
        }
      );
    }

    if (typeof payload.answer !== "string" || !payload.answer.trim()) {
      return NextResponse.json(
        { error: "The service returned an empty response." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      answer: payload.answer,
    });
  } catch {
    return NextResponse.json(
      { error: "The service is temporarily unavailable." },
      { status: 500 }
    );
  }
}