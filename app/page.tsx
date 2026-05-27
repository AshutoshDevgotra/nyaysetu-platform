"use client";

import React, { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { Sparkles, BookOpen } from "lucide-react";
import Banner from "@/app/components/Banner";
import Impact from "@/app/components/Impact";
import TrustedBy from "@/app/components/TrustedBy";
import Workflow from "@/app/components/Workflow";
import Outcomes from "@/app/components/Outcomes";
import ExpertProfiles from "./components/ExpertProfiles";

export default function Home() {
  const [response, setResponse] = useState<string | null>(null);
  const [sources, setSources] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      setResponse(null);

      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
        cache: "no-store",
      });

      if (!res.ok) {
        if (res.status === 429) {
          setResponse("We're experiencing high traffic. Please try again in 30 seconds.");
          return;
        }

        // Try to parse error details if available
        let errorMessage = `Request failed with status ${res.status}`;
        try {
          const errorData = await res.json();
          if (errorData.error && String(errorData.error).includes("429")) {
            setResponse("We're experiencing high traffic (Rate Limit Exceeded). Please try again in a moment.");
            return;
          }
        } catch (e) { }

        throw new Error(errorMessage);
      }

      const data = await res.json();
      setResponse(data.answer);
      if (data.sources) {
        setSources(data.sources);
      } else {
        setSources(null);
      }
    } catch (err) {
      console.error("Search failed:", err);
      // Don't overwrite response if we already set a specific message
      setResponse((prev) => prev && prev.includes("high traffic") ? prev : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="bg-[#0f0f0f] min-h-screen">
        <Banner onSearch={handleSearch} />

        {/* AI Response Section */}
        {(loading || response) && (
          <div className="max-w-4xl mx-auto px-4 py-2 -mt-6 mb-8">
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#141414] border border-[#ffcc99]/20 rounded-2xl p-8 text-center shadow-xl shadow-[#ffcc99]/5"
              >
                <div className="flex justify-center items-center gap-1.5 mb-3">
                  <div className="w-2.5 h-2.5 bg-[#ffcc99] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2.5 h-2.5 bg-[#ffcc99] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2.5 h-2.5 bg-[#ffcc99] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
                <p className="text-[#ffe0b3] text-sm font-medium">Formulating legal insights...</p>
              </motion.div>
            )}

            {response && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-[#141414] border border-[#ffcc99]/20 text-white p-8 rounded-2xl shadow-2xl shadow-[#ffcc99]/5 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffcc99]/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="flex items-center gap-3 mb-5 border-b border-[#222] pb-4">
                  <div className="p-2.5 bg-[#ffcc99]/10 text-[#ffcc99] rounded-xl">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">NyaySetu AI Response</h3>
                    <p className="text-[11px] text-[#ffe0b3]/60 uppercase tracking-wider font-semibold">Verified Legal Guidance Engine</p>
                  </div>
                </div>

                <div className="text-gray-300 leading-relaxed prose prose-invert max-w-none text-base space-y-4">
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className="mb-4 text-gray-300">{children}</p>,
                      ul: ({ children }) => <ul className="list-disc ml-6 mb-4 space-y-2 text-gray-300">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal ml-6 mb-4 space-y-2 text-gray-300">{children}</ol>,
                      li: ({ children }) => <li className="pl-1">{children}</li>,
                      strong: ({ children }) => <strong className="text-[#ffcc99] font-semibold">{children}</strong>,
                      em: ({ children }) => <em className="text-gray-400 italic">{children}</em>,
                      h1: ({ children }) => <h1 className="text-2xl font-bold text-white mt-6 mb-3">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-xl font-bold text-white mt-5 mb-3">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-lg font-bold text-white mt-4 mb-2">{children}</h3>,
                    }}
                  >
                    {response}
                  </ReactMarkdown>
                </div>

                {sources && sources.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-[#222]">
                    <div className="flex items-center gap-2 text-sm text-[#ffcc99] font-semibold mb-3">
                      <BookOpen className="h-4 w-4" />
                      <span>Referenced Legal Sources</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {sources.map((src, idx) => (
                        <div key={idx} className="p-3 bg-[#1c1c1c] border border-[#2c2c2c] rounded-xl text-xs hover:border-[#ffcc99]/30 transition-all">
                          <strong className="text-[#ffcc99] block mb-1">{src.section || `Source #${idx + 1}`}</strong>
                          <p className="text-gray-400 line-clamp-2 leading-relaxed">{src.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 pt-4 border-t border-[#222] flex items-center justify-between text-xs text-[#ffe0b3]/75 bg-[#ffcc99]/5 -mx-8 -mb-8 px-8 py-4">
                  <span>💡 Need direct representation? Consult a verified advocate below.</span>
                  <Link href="/find-lawyers" className="text-[#ffcc99] hover:underline font-semibold">
                    Find Advocates →
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Feature Cards Section (Expert Advocates, etc.) */}
        <div className="max-w-4xl mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[{ icon: "⚖️", title: "Expert Advocates", desc: "Verified legal professionals with proven track records" },
            { icon: "💰", title: "Affordable Pricing", desc: "Transparent, competitive rates for quality legal services" },
            { icon: "🤝", title: "Easy Process", desc: "Simple registration and booking for quick legal assistance" }].map((item, idx) => (
              <motion.div
                key={item.title}
                className="bg-[#1a1a1a] brand-border border rounded-lg p-6 hover:shadow-lg hover:shadow-[#ffcc99]/20 transition-all duration-300"
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

        <TrustedBy />
        <Impact />
        <Workflow />
        <Outcomes />

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
              <Link
                href="/find-lawyers"
                className="bg-[#ffcc99] text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#ffe0b3] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
              >
                Find Advocates Now
              </Link>
              <Link
                href="/lawyer-dashboard"
                className="border-2 border-[#ffcc99] text-[#ffcc99] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#ffcc99] hover:text-black transition-all duration-300 flex items-center justify-center"
              >
                Join as Advocate
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
