"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

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
    <section className="relative bg-gradient-to-br from-[#0f0f0f] via-[#111] to-[#0f0f0f] py-20 px-4 text-center overflow-hidden bg-grid">
      {/* Floating background accents */}
      <motion.div
        aria-hidden
        className="absolute -top-24 -left-24 w-72 h-72 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(255,204,153,0.12), transparent)" }}
        animate={{ y: [0, 14, 0], x: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(255,204,153,0.08), transparent)" }}
        animate={{ y: [0, -14, 0], x: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Making Legal Advice
            <span className="block text-[#ffcc99]">Accessible to All</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#ffe0b3] mb-4 max-w-3xl mx-auto leading-relaxed">
            Reduce case filing time, automate tracking, and get date-change workflows with verified advocates.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-8">
            <span className="text-sm brand bg-[#2b2b2b] brand-border border rounded px-3 py-1">~40% faster filing</span>
            <span className="text-sm brand bg-[#2b2b2b] brand-border border rounded px-3 py-1">Rights clarity in &lt;10s</span>
            <span className="text-sm brand bg-[#2b2b2b] brand-border border rounded px-3 py-1">Bar Council + Aadhaar verified</span>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
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
        </motion.form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[{ icon: "⚖️", title: "Expert Advocates", desc: "Verified legal professionals with proven track records" },
            { icon: "💰", title: "Affordable Pricing", desc: "Transparent, competitive rates for quality legal services" },
            { icon: "🤝", title: "Easy Process", desc: "Simple registration and booking for quick legal assistance" }].map((item, idx) => (
            <motion.div
              key={item.title}
              className="bg-[#1a1a1a] brand-border border rounded-lg p-6 hover:shadow-lg hover:shadow-[#ffcc99]/20 transition-all duration-300 hover-zoom"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (idx + 1), duration: 0.45 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="brand text-3xl mb-3">{item.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-secondary text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
