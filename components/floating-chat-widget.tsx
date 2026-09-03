"use client";

import { FormEvent, useMemo, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const MAX_LENGTH = 300;

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const remaining = useMemo(
    () => MAX_LENGTH - question.length,
    [question.length]
  );

  const getTextDirection = (text: string): "rtl" | "ltr" => {
    if (!text.trim()) return "ltr";

    const rtlChars = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/g;
    const match = text.match(rtlChars);

    return match && match.length > text.length * 0.3 ? "rtl" : "ltr";
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const trimmed = question.trim();

    if (!trimmed) {
      setError("Please enter a question.");
      return;
    }

    if (trimmed.length > MAX_LENGTH) {
      setError("Question must be 300 characters or less.");
      return;
    }

    if (isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: trimmed,
    };

    setMessages((current) => [...current, userMessage]);
    setQuestion("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: trimmed,
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 429) {
          setError(
            "Too many requests. Please wait a moment and try again."
          );
        } else {
          setError(
            "Sorry, something went wrong while answering your question."
          );
        }

        return;
      }

      const answer =
        typeof payload.answer === "string" && payload.answer.trim()
          ? payload.answer
          : "Sorry, I could not generate an answer right now.";

      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: answer,
      };

      setMessages((current) => [...current, assistantMessage]);
    } catch {
      setError("The service is currently unavailable.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="floating-chat-button"
        aria-label="Open chat"
        title="Ask Nejood AI"
      >
        <MessageCircle size={24} />
      </button>

      {isOpen && (
        <div className="floating-chat-widget">
          <div className="chat-widget-header">
            <div>
              <p className="chat-widget-label">Portfolio Assistant</p>
              <h3>Ask about Nejood&apos;s experience</h3>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="chat-close-button"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          <div className="chat-widget-content" aria-live="polite">
            {messages.length === 0 && (
              <div className="chat-empty-state">
                Ask about AI, RAG, data, business analysis, or experience.
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message ${
                  message.role === "user"
                    ? "user-message"
                    : "assistant-message"
                }`}
              >
                <div
                  className="chat-message-bubble"
                  dir={getTextDirection(message.content)}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="chat-message assistant-message">
                <div className="chat-message-bubble chat-typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            {error && (
              <p className="chat-error" role="alert">
                {error}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="chat-widget-form">
            <div className="chat-input-container">
              <textarea
                aria-label="Ask a question"
                value={question}
                onChange={(event) =>
                  setQuestion(
                    event.target.value.slice(0, MAX_LENGTH)
                  )
                }
                placeholder="Type a message..."
                rows={1}
                maxLength={MAX_LENGTH}
                disabled={isLoading}
                dir={getTextDirection(question)}
              />

              <button
                type="submit"
                className="chat-send-button"
                disabled={isLoading || !question.trim()}
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>

            <div className="chat-widget-meta">
              <span>{remaining} characters left</span>
            </div>
          </form>
        </div>
      )}
    </>
  );
}