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

    const res = await fetch("https://api.growwithgarry.in/ask", {
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
    <main className="bg-[#0f0f0f] min-h-screen">
      <Banner onSearch={handleSearch} />
      
      {/* AI Response Section */}
      {(loading || response) && (
        <div className="max-w-4xl mx-auto px-4 py-8">
          {loading && (
            <div className="bg-[#1a1a1a] border border-[#ffcc99] rounded-lg p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ffcc99] mx-auto mb-4"></div>
              <p className="text-[#ffe0b3]">Getting legal insights for you...</p>
            </div>
          )}
          {response && (
            <div className="bg-[#1a1a1a] border border-[#ffcc99] text-white p-6 rounded-lg shadow-lg mb-8">
              <h3 className="text-[#ffcc99] font-semibold mb-3 flex items-center gap-2">
                🤖 AI Legal Assistant Response
              </h3>
              <div className="text-[#ffe0b3] leading-relaxed">
                {response.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-2">{paragraph}</p>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-[#333]">
                <p className="text-sm text-[#ffcc99]">
                  💡 For personalized legal advice, consult with our verified advocates below.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Why Choose NyaySetu?
          </h2>
          <p className="text-[#ffe0b3] text-lg mb-8 max-w-2xl mx-auto">
            We're revolutionizing access to legal services in India, making expert advice affordable and accessible to every citizen.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-[#ffcc99] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-black">⚖️</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Verified Advocates</h3>
              <p className="text-[#ffe0b3] text-sm">All advocates are verified by Bar Council</p>
            </div>
            <div className="text-center">
              <div className="bg-[#ffcc99] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-black">💰</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Transparent Pricing</h3>
              <p className="text-[#ffe0b3] text-sm">No hidden fees, clear pricing structure</p>
            </div>
            <div className="text-center">
              <div className="bg-[#ffcc99] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-black">🤝</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Easy Booking</h3>
              <p className="text-[#ffe0b3] text-sm">Book consultations in just a few clicks</p>
            </div>
            <div className="text-center">
              <div className="bg-[#ffcc99] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-black">🚀</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Quick Response</h3>
              <p className="text-[#ffe0b3] text-sm">Get responses within 24 hours</p>
            </div>
          </div>
        </div>
      </div>

      {/* Expert Advocates Section */}
      <ExpertProfiles />
      
      {/* Final CTA Section */}
      <div className="bg-[#1a1a1a] border-t border-[#ffcc99] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Legal Help?
          </h2>
          <p className="text-[#ffe0b3] text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied clients who found the right legal representation through NyaySetu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/find-lawyers'}
              className="bg-[#ffcc99] text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#ffe0b3] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Find Advocates Now
            </button>
            <button 
              onClick={() => window.location.href = '/lawyer-dashboard'}
              className="border-2 border-[#ffcc99] text-[#ffcc99] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#ffcc99] hover:text-black transition-all duration-300"
            >
              Join as Advocate
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
