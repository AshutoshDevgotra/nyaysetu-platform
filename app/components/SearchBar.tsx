"use client";
import React, { useState } from "react";
import { Search, Loader2 } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading?: boolean;
}

export default function SearchBar({ onSearch, loading = false }: SearchBarProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    onSearch(input.trim());
  };

  const handleClear = () => {
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-input-container">
        <div className="search-icon">
          <Search className="w-5 h-5 text-white" />
        </div>
        <input
          type="text"
          name="legal-query"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your legal question about Indian law, constitution, or acts..."
          className="search-input "
          disabled={loading}
          maxLength={500}
        />
        {input && !loading && (
          <button
            type="button"
            onClick={handleClear}
            className="clear-button"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      <button
        type="submit"
        className="search-button"
        disabled={!input.trim() || loading}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Analyzing...
          </>
        ) : (
          <>
            <Search className="w-4 h-4 mr-2" />
            Ask RAG
          </>
        )}
      </button>

      <style jsx>{`
        .search-form {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .search-input-container {
          position: relative;
          flex: 1;
          min-width: 300px;
          color: white;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
        }

        .search-input {
          width: 100%;
          padding: 12px 16px 12px 44px;
          border: 2px solid rgba(255, 204, 153, 0.5);
          border-radius: 12px;
          font-size: 16px;
          color: #ffffff;
          background-color: rgba(17, 17, 17, 0.85);
          transition: all 0.2s ease;
          outline: none;
        }

        .search-input::placeholder {
          color: rgba(248, 231, 204, 0.6);
        }

        .search-input:focus {
          border-color: #f2d3a3;
          box-shadow: 0 0 0 3px rgba(242, 211, 163, 0.2);
        }

        .search-input:disabled {
          color: rgba(255, 255, 255, 0.6);
          background-color: #1f2937;
          cursor: not-allowed;
        }

        .clear-button {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: color 0.2s ease;
        }

        .clear-button:hover {
          color: #6b7280;
          background-color: #f3f4f6;
        }

        .search-button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px 24px;
          background: linear-gradient(135deg, #f2d3a3, #f8e7cc);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          min-width: 130px;
          color: #0a0a0a;
          box-shadow: 0 6px 20px rgba(242, 211, 163, 0.25);
        }

        .search-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #ffe7c5, #f2d3a3);
          transform: translateY(-1px);
          box-shadow: 0 10px 24px rgba(242, 211, 163, 0.35);
        }

        .search-button:disabled {
          background: #3f3f46;
          color: #a1a1aa;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        @media (max-width: 640px) {
          .search-form {
            flex-direction: column;
          }

          .search-input-container {
            min-width: 100%;
          }

          .search-button {
            width: 100%;
          }
        }
      `}</style>
    </form>
  );
}
