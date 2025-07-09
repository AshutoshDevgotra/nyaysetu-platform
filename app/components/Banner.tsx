"use client";

import React, { useState } from "react";

interface BannerProps {
  onSearch: (query: string) => void;
}

export default function Banner({ onSearch }: BannerProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
    }
  };

  return (
    <section className="bg-[#d4af37] py-10 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Find Legal Experts for Your Needs</h1>
      <p className="mb-6">Search for legal help, documents, or advice tailored to your situation.</p>
      <form onSubmit={handleSubmit} className="flex justify-center gap-2">
        <input
          type="text"
          placeholder="Ask your legal question..."
          className="px-4 py-2 rounded text-black w-full max-w-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-white text-[#d4af37] rounded font-semibold hover:bg-gray-100"
        >
          Search
        </button>
      </form>
    </section>
  );
}
