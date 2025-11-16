"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ContactPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactPanel({ open, onClose }: ContactPanelProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60]">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Panel */}
          <motion.div
            className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-[#0f0f0f] brand-border border-l p-6 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-xl font-semibold">Book a demo</h3>
              <button onClick={onClose} className="text-[#ffcc99] text-xl">✕</button>
            </div>
            <p className="text-secondary text-sm mb-6">
              Tell us a bit about your practice/org. We’ll share a quick walkthrough and timelines.
            </p>
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-[#ffe0b3] mb-1">Name</label>
                <input className="w-full px-4 py-2 rounded bg-[#1a1a1a] border border-[#333] text-white focus:border-[#ffcc99] focus:outline-none" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm text-[#ffe0b3] mb-1">Email</label>
                <input type="email" className="w-full px-4 py-2 rounded bg-[#1a1a1a] border border-[#333] text-white focus:border-[#ffcc99] focus:outline-none" placeholder="name@firm.com" />
              </div>
              <div>
                <label className="block text-sm text-[#ffe0b3] mb-1">Role</label>
                <input className="w-full px-4 py-2 rounded bg-[#1a1a1a] border border-[#333] text-white focus:border-[#ffcc99] focus:outline-none" placeholder="Advocate, Ops, Founder, etc." />
              </div>
              <div>
                <label className="block text-sm text-[#ffe0b3] mb-1">Message</label>
                <textarea rows={4} className="w-full px-4 py-2 rounded bg-[#1a1a1a] border border-[#333] text-white focus:border-[#ffcc99] focus:outline-none" placeholder="What would you like to see in the demo?" />
              </div>
              <button type="button" onClick={onClose} className="w-full px-4 py-3 rounded brand-bg font-semibold hover:bg-[#ffe0b3] transition">
                Request demo
              </button>
              <div className="text-xs text-[#666]">We verify advocates by Bar Council ID and Aadhaar-linked authentication for secured access.</div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

