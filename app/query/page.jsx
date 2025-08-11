"use client";
import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import ChatResponse from "../components/ChatResponse";
import FloatingActions from "../components/FloatingActions";

export default function Page() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [error, setError] = useState(null);

  const makeRequest = async (userQuery, attempt = 1) => {
    try {
      const response = await fetch("http://localhost:8082/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userQuery }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status >= 500 && attempt < 3) {
          console.log(`Attempt ${attempt} failed, retrying...`);
          await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
          return makeRequest(userQuery, attempt + 1);
        }
        throw new Error(data?.error || `Request failed with status ${response.status}`);
      }

      return data;
    } catch (err) {
      // Network or unexpected errors: retry up to 3 attempts
      if (attempt < 3) {
        console.log(`Attempt ${attempt} errored, retrying...`);
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
        return makeRequest(userQuery, attempt + 1);
      }
      throw err;
    }
  };

  const handleSearch = async (userQuery) => {
    setError(null);
    setRetryCount(0);

    const userMessage = {
      id: Date.now().toString(),
      type: "user",
      content: userQuery,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const data = await makeRequest(userQuery);

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: data.answer || "No response received from RAG model.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setRetryCount(0);
    } catch (err) {
      console.error("Search error:", err);
      setError(err.message || "Unable to connect to the legal AI system. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    const lastUserMessage = messages.filter((m) => m.type === "user").pop();
    if (lastUserMessage) {
      setRetryCount((prev) => prev + 1);
      setMessages((prev) => prev.filter((m) => m.type === "user"));
      handleSearch(lastUserMessage.content);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setError(null);
    setRetryCount(0);
  };

  const handleExportChat = () => {
    if (messages.length === 0) return;

    const chatContent = messages
      .map((msg) => {
        const timestamp = msg.timestamp.toLocaleString();
        const sender = msg.type === "user" ? "You" : "Legal AI Assistant";
        return `[${timestamp}] ${sender}:\n${msg.content}\n`;
      })
      .join("\n");

    const blob = new Blob([chatContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `legal-ai-chat-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="query-page">
      <div className="query-container">
        <div className="query-header"></div>
        <h1 className="query-title">🧠 Legal AI Assistant</h1>
        <p className="query-subtitle">
          Get instant answers about Indian law, constitution, and legal acts using our RAG-powered AI system.
        </p>
      </div>

      <div className="search-container">
        <SearchBar onSearch={handleSearch} loading={loading} />

        {messages.length > 0 && (
          <div className="chat-controls">
            <button onClick={handleClearChat} className="clear-chat-button">
              Clear Chat
            </button>
          </div>
        )}
      </div>

      {messages.length > 0 || loading ? (
        <div className="chat-container">
          <ChatResponse messages={messages} loading={loading} />
        </div>
      ) : (
        <div className="welcome-container">
          <div className="welcome-content">
            <h3>Welcome to Legal AI Assistant</h3>
            <p>
              Ask questions about Indian law, constitution, and legal acts. Our AI system will provide detailed
              responses based on legal documentation.
            </p>

            <div className="example-questions">
              <h4>Example questions:</h4>
              <div className="example-grid">
                <button
                  onClick={() =>
                    handleSearch("What are the fundamental rights under the Indian Constitution?")
                  }
                  className="example-button"
                >
                  What are the fundamental rights under the Indian Constitution?
                </button>
                <button
                  onClick={() => handleSearch("What is the procedure for filing a PIL?")}
                  className="example-button"
                >
                  What is the procedure for filing a PIL?
                </button>
                <button
                  onClick={() =>
                    handleSearch("What are the grounds for divorce under Hindu Marriage Act?")
                  }
                  className="example-button"
                >
                  What are the grounds for divorce under Hindu Marriage Act?
                </button>
                <button
                  onClick={() => handleSearch("What is Section 498A of IPC?")}
                  className="example-button"
                >
                  What is Section 498A of IPC?
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="error-container">
          <div className="error-content">
            <strong>Error:</strong> {error}
            {retryCount > 0 && <p className="retry-info">Retry attempt: {retryCount}</p>}
          </div>
          <button onClick={handleRetry} className="retry-button" disabled={loading}>
            {loading ? "Retrying..." : "Try Again"}
          </button>
        </div>
      )}

      <FloatingActions
        onClearChat={handleClearChat}
        onExportChat={handleExportChat}
        messagesCount={messages.length}
      />

      <style jsx>{`
        .query-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          padding: 32px 16px;
        }

        .query-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .query-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .query-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 16px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .query-subtitle {
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          color: #cbd5e1;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .search-container {
          margin-bottom: 24px;
        }

        .chat-controls {
          display: flex;
          justify-content: flex-end;
          margin-top: 12px;
        }

        .clear-chat-button {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #f87171;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .clear-chat-button:hover {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        .chat-container {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 16px;
          padding: 20px;
          margin: 24px 0;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .welcome-container {
          text-align: center;
          padding: 60px 20px;
        }

        .welcome-content h3 {
          color: #f1f5f9;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .welcome-content p {
          color: #cbd5e1;
          font-size: 16px;
          margin-bottom: 40px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .example-questions h4 {
          color: #e2e8f0;
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .example-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
          max-width: 800px;
          margin: 0 auto;
        }

        .example-button {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #a7f3d0;
          padding: 16px 20px;
          border-radius: 12px;
          font-size: 14px;
          text-align: left;
          cursor: pointer;
          transition: all 0.3s ease;
          line-height: 1.4;
        }

        .example-button:hover {
          background: rgba(16, 185, 129, 0.2);
          border-color: rgba(16, 185, 129, 0.5);
          color: #d1fae5;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.15);
        }

        .error-container {
          background-color: #fef2f2;
          border: 1px solid #fca5a5;
          color: #991b1b;
          padding: 16px;
          margin-top: 16px;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }

        .error-content {
          flex: 1;
        }

        .retry-info {
          font-size: 14px;
          color: #7f1d1d;
          margin-top: 4px;
          margin-bottom: 0;
        }

        .retry-button {
          background-color: #dc2626;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          font-size: 14px;
          transition: background-color 0.2s ease;
          white-space: nowrap;
        }

        .retry-button:hover:not(:disabled) {
          background-color: #b91c1c;
        }

        .retry-button:disabled {
          background-color: #9ca3af;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .query-page {
            padding: 20px 12px;
          }

          .query-header {
            margin-bottom: 24px;
          }

          .chat-container {
            padding: 16px;
            margin: 16px 0;
          }

          .welcome-container {
            padding: 40px 16px;
          }

          .example-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .example-button {
            padding: 14px 16px;
            font-size: 13px;
          }

          .error-container {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>
    </div>
  );
}
