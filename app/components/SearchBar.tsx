"use client";
import React, { useState } from 'react';

export default function SearchBar() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("query", input);

      const response = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.answer);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Error connecting to the backend.");
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your question..."
          className="border px-3 py-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Ask
        </button>
      </form>

      {result && (
        <div className="bg-green-100 p-4 rounded text-black">
          <strong>Answer:</strong> {result}
        </div>
      )}
      {error && (
        <div className="bg-red-100 p-4 rounded text-black">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}
