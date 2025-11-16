"use client";

import React, { useState } from "react";
import Banner from "@/app/components/Banner";
import Impact from "@/app/components/Impact";
import TrustedBy from "@/app/components/TrustedBy";
import Workflow from "@/app/components/Workflow";
import Outcomes from "@/app/components/Outcomes";
import BookDemoCTA from "@/app/components/BookDemoCTA";
import ContactPanel from "@/app/components/ContactPanel";

import ExpertProfiles from "./components/ExpertProfiles";
import Footer from "./components/Footer";

export default function Home() {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

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
    <>
    <main className="bg-[#0f0f0f] min-h-screen">
      <Banner onSearch={handleSearch} />
      <TrustedBy />
      <Impact />
      <Workflow />
      <BookDemoCTA onOpen={() => setContactOpen(true)} />
      <Outcomes />
      
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

      {/* Why Choose - redesigned */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#0f0f0f] via-[#121212] to-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Why choose NyaySetu</h2>
            <p className="text-secondary max-w-2xl mx-auto">Faster filings, clearer updates, and verified representation — designed for India.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[{
              icon: "⚡", title: "Faster filings", desc: "Smart forms + templates cut repetitive steps.", chip: "~40% quicker"
            }, {
              icon: "🔔", title: "Clear updates", desc: "Auto tracking and alerts for court dates.", chip: "Fewer follow-ups"
            }, {
              icon: "🧭", title: "Rights in seconds", desc: "Answers from trusted legal databases.", chip: "<10s"
            }, {
              icon: "🛡️", title: "Verified pros", desc: "Bar Council ID + Aadhaar-linked checks.", chip: "Verified"
            }].map((c, i) => (
              <div key={c.title} className="relative bg-[#1a1a1a] brand-border border rounded-2xl p-6 hover-zoom">
                <div className="absolute -top-4 left-6 w-10 h-10 rounded-full" style={{ background: "radial-gradient(circle at 30% 30%, rgba(242,211,163,0.5), transparent 60%)" }} />
                <div className="flex items-center justify-between mb-3">
                  <div className="text-white text-xl font-semibold flex items-center gap-2"><span className="brand text-2xl">{c.icon}</span>{c.title}</div>
                  <span className="text-xs px-2 py-1 rounded bg-[#2b2b2b] brand-border border brand">{c.chip}</span>
                </div>
                <p className="text-secondary text-sm">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Advocates Section (teaser) */}
      <ExpertProfiles teaser />
      
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
    <ContactPanel open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
