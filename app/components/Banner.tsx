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
    <section className="relative bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] py-20 px-4 text-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-[#ffcc99] rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-[#ffcc99] rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-[#ffcc99] rounded-full"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Making Legal Advice
            <span className="block text-[#ffcc99]">Accessible to All</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#ffe0b3] mb-4 max-w-3xl mx-auto leading-relaxed">
            Connect with verified advocates at affordable prices. Expert legal guidance simplified for every citizen.
          </p>
          <p className="text-lg text-[#ffcc99] mb-8 font-medium">
            "Justice shouldn't be a privilege - it's a right for everyone"
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row justify-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Ask your legal question or describe your situation..."
            className="px-6 py-4 rounded-lg text-black w-full max-w-2xl text-lg border-2 border-[#ffcc99] focus:outline-none focus:border-[#ffe0b3] shadow-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#ffcc99] text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#ffe0b3] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Legal Help
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-[#1a1a1a] border border-[#ffcc99] rounded-lg p-6 hover:shadow-lg hover:shadow-[#ffcc99]/20 transition-all duration-300">
            <div className="text-[#ffcc99] text-3xl mb-3">⚖️</div>
            <h3 className="text-white font-bold text-lg mb-2">Expert Advocates</h3>
            <p className="text-[#ffe0b3] text-sm">Verified legal professionals with proven track records</p>
          </div>
          <div className="bg-[#1a1a1a] border border-[#ffcc99] rounded-lg p-6 hover:shadow-lg hover:shadow-[#ffcc99]/20 transition-all duration-300">
            <div className="text-[#ffcc99] text-3xl mb-3">💰</div>
            <h3 className="text-white font-bold text-lg mb-2">Affordable Pricing</h3>
            <p className="text-[#ffe0b3] text-sm">Transparent, competitive rates for quality legal services</p>
          </div>
          <div className="bg-[#1a1a1a] border border-[#ffcc99] rounded-lg p-6 hover:shadow-lg hover:shadow-[#ffcc99]/20 transition-all duration-300">
            <div className="text-[#ffcc99] text-3xl mb-3">🤝</div>
            <h3 className="text-white font-bold text-lg mb-2">Easy Process</h3>
            <p className="text-[#ffe0b3] text-sm">Simple registration and booking for quick legal assistance</p>
          </div>
        </div>
      </div>
    </section>
  );
}
