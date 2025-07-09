"use client";

import React, { useState } from "react";
import Banner from "@/app/components/Banner";

import ExpertProfiles from "./components/ExpertProfiles";
import Footer from "./components/Footer";

export default function Home() {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      setResponse(null);

      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.answer);
    } catch (err) {
      console.error("Search failed:", err);
      setResponse("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Banner onSearch={handleSearch} />
      <div className="max-w-3xl mx-auto px-4 py-8">
        {loading && <p className="text-gray-500">Loading...</p>}
        {response && (
          <div className="bg-grey text-white p-4 rounded shadow">
            <p>{response}</p>
          </div>
        )}
        <ExpertProfiles />
        
      </div>
    </main>
  );
}
