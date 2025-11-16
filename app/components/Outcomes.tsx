"use client";

import { motion } from "framer-motion";

export default function Outcomes() {
  return (
    <section className="py-16 px-4 bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white">What you get</h2>
          <p className="text-[#ffe0b3] mt-2">Faster filings. Clear updates. Verified pros.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Case Filing Time */}
          <motion.div className="relative bg-[#1a1a1a] brand-border border rounded-xl p-6 hover-zoom overflow-hidden" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} whileHover={{ scale: 1.02 }}>
            <div className="absolute inset-x-0 -top-8 h-16" style={{ background: "radial-gradient(closest-side, rgba(242,211,163,0.25), transparent)" }} />
            <div className="text-[#ffcc99] text-sm mb-2">Before → After</div>
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2"><span className="brand">⚡</span>Case filing time</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-[#2b2b2b] rounded p-3">
                <div className="text-[#ffe0b3]">Manual paperwork</div>
                <div className="text-white font-semibold">2-3 hours</div>
              </div>
              <div className="bg-[#0f0f0f] border brand-border rounded p-3">
                <div className="text-secondary">Smart intake</div>
                <div className="text-white font-semibold">~1 hour</div>
              </div>
            </div>
          </motion.div>

          {/* Tracking & Scheduling */}
          <motion.div className="relative bg-[#1a1a1a] brand-border border rounded-xl p-6 hover-zoom overflow-hidden" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.05 }} whileHover={{ scale: 1.02 }}>
            <div className="absolute inset-x-0 -top-8 h-16" style={{ background: "radial-gradient(closest-side, rgba(242,211,163,0.25), transparent)" }} />
            <div className="text-[#ffcc99] text-sm mb-2">Before → After</div>
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2"><span className="brand">🔔</span>Tracking & court dates</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-[#2b2b2b] rounded p-3">
                <div className="text-[#ffe0b3]">Unstructured updates</div>
                <div className="text-white font-semibold">Ad-hoc calls</div>
              </div>
              <div className="bg-[#0f0f0f] border brand-border rounded p-3">
                <div className="text-secondary">Automated tracking</div>
                <div className="text-white font-semibold">Smart alerts & date-change workflows</div>
              </div>
            </div>
          </motion.div>

          {/* Rights Awareness */}
          <motion.div className="relative bg-[#1a1a1a] brand-border border rounded-xl p-6 hover-zoom overflow-hidden" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.1 }} whileHover={{ scale: 1.02 }}>
            <div className="absolute inset-x-0 -top-8 h-16" style={{ background: "radial-gradient(closest-side, rgba(242,211,163,0.25), transparent)" }} />
            <div className="text-[#ffcc99] text-sm mb-2">Before → After</div>
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2"><span className="brand">🧭</span>Rights awareness</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-[#2b2b2b] rounded p-3">
                <div className="text-[#ffe0b3]">Search complexity</div>
                <div className="text-white font-semibold">Hours on blogs</div>
              </div>
              <div className="bg-[#0f0f0f] border border-[#ffcc99] rounded p-3">
                <div className="text-[#ffe0b3]">AI retrieval</div>
                <div className="text-white font-semibold">Seconds from trusted DBs</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust & Verification blurb */}
        <motion.div className="relative bg-[#1a1a1a] brand-border border rounded-xl p-6 mb-10 hover-zoom overflow-hidden" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} whileHover={{ scale: 1.02 }}>
          <img src="/illustrations/verified-id.svg" alt="Aadhaar-linked Bar Council verification" className="hidden sm:block absolute right-4 top-4 w-40 h-auto opacity-90" />
          <h3 className="text-white font-semibold mb-2">Verified advocates</h3>
          <p className="text-secondary text-sm max-w-md">Bar Council ID + Aadhaar-linked checks; verified badges shown on profiles and bookings.</p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{
            quote: "Filing went from hours to under an hour. The guided steps are a game-changer.",
            name: "Adv. Kanika",
          }, {
            quote: "Clients get date-change updates instantly; I spend less time on coordination.",
            name: "Adv. Vipin",
          }, {
            quote: "I understood my rights in minutes and matched with a verified advocate.",
            name: "Client, Delhi",
          }].map((t, i) => (
            <motion.blockquote key={i} className="bg-[#1a1a1a] brand-border border rounded-xl p-6 text-secondary hover-zoom" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.05 * i }} whileHover={{ scale: 1.02 }}>
              <p className="mb-3">“{t.quote}”</p>
              <div className="text-white font-semibold">{t.name}</div>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

