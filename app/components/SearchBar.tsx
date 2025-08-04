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
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your legal question about Indian law, constitution, or acts..."
          className="search-input"
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
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 16px;
          color: #1f2937;
          background-color: white;
          transition: all 0.2s ease;
          outline: none;
        }

        .search-input:focus {
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }

        .search-input:disabled {
          background-color: #f9fafb;
          color: #9ca3af;
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
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          min-width: 130px;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
        }

        .search-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #059669, #047857);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .search-button:disabled {
          background-color: #9ca3af;
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
