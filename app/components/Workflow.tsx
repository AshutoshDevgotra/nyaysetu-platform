"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Know Your Rights",
    desc: "Ask in Hindi/English. We fetch trusted answers fast.",
    kpi: "<10s answer",
  },
  {
    title: "File Faster",
    desc: "Smart form, auto-fill, and ready templates.",
    kpi: "~40% quicker",
  },
  {
    title: "Stay on Track",
    desc: "Auto updates, alerts, and date-change requests.",
    kpi: "Fewer follow-ups",
  },
  {
    title: "Work with Verified",
    desc: "Bar Council ID + Aadhaar-linked checks.",
    kpi: "Verified",
  },
];

export default function Workflow() {
  return (
    <section className="py-16 px-4 bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white">How it works</h2>
          <p className="text-[#ffe0b3] mt-2">From question → filing → updates → verified advocate.</p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-[#1f1f1f]">
            <motion.div className="h-1 bg-[#ffcc99]" initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((s, idx) => (
              <motion.div
                key={s.title}
                className="relative bg-[#1a1a1a] border border-[#ffcc99] rounded-xl p-6"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.1 * idx, duration: 0.5 }}
              >
                <div className="text-[#ffcc99] text-sm mb-2">Step {idx + 1}</div>
                <h3 className="text-white font-semibold mb-2">{s.title}</h3>
                <p className="text-[#ffe0b3] text-sm mb-3">{s.desc}</p>
                <div className="inline-block text-xs px-2 py-1 rounded bg-[#2b2b2b] border border-[#ffcc99] text-[#ffe0b3]">{s.kpi}</div>
                {/* Connector dots for desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#ffcc99]" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

