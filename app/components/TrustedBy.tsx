"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const logos = [
  { src: "/Advocates/supremecourt.jpg", alt: "India Judiciary Data" },
  { src: "/Advocates/Lawyer3.jpeg", alt: "Leading Law Chambers" },
  { src: "/Advocates/lawyer1.jpeg", alt: "Regional Bar Associations" },
  { src: "/Advocates/mainbgimg.jpeg", alt: "Justice Access Initiatives" },
];

export default function TrustedBy() {
  return (
    <section className="py-12 px-4 bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-center text-white text-sm tracking-wider uppercase mb-6 opacity-80">Trusted by leading advocates and teams</h3>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0f0f0f] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0f0f0f] to-transparent z-10" />
          <motion.div
            className="flex items-center gap-10 opacity-90"
            initial={{ x: 0 }}
            animate={{ x: [0, -600, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            {[...logos, ...logos].map((logo, i) => (
              <motion.div key={i} className="shrink-0 grayscale hover:grayscale-0 transition hover-zoom" whileHover={{ scale: 1.06 }}>
                <Image src={logo.src} alt={logo.alt} width={140} height={56} className="object-cover rounded-md" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

