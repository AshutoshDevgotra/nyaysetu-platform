"use client";

import { motion } from "framer-motion";

interface BookDemoCTAProps {
  onOpen: () => void;
}

export default function BookDemoCTA({ onOpen }: BookDemoCTAProps) {
  return (
    <section id="book-demo" className="py-14 px-4 bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f]">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h3 className="text-3xl font-bold text-white mb-3" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
          See how we cut filing time and automate tracking
        </motion.h3>
        <motion.p className="text-secondary mb-6" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.05 }}>
          From instant rights awareness to verified representation via Bar Council IDs and Aadhaar-linked auth.
        </motion.p>
        <motion.button
          onClick={onOpen}
          className="px-8 py-4 rounded-lg brand-bg font-semibold hover:bg-[#ffe0b3] transition shadow-lg hover-zoom"
          whileHover={{ y: -2, scale: 1.02 }}
        >
          Book a demo
        </motion.button>
      </div>
    </section>
  );
}

