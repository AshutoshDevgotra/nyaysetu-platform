"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const impactData = [
  { month: "Jan", timeSaved: 120, matches: 40, costSaved: 0.8 },
  { month: "Feb", timeSaved: 220, matches: 75, costSaved: 1.6 },
  { month: "Mar", timeSaved: 360, matches: 130, costSaved: 2.5 },
  { month: "Apr", timeSaved: 540, matches: 210, costSaved: 3.9 },
  { month: "May", timeSaved: 760, matches: 320, costSaved: 5.6 },
  { month: "Jun", timeSaved: 980, matches: 420, costSaved: 7.1 },
];

export default function Impact() {
  return (
    <section className="py-16 px-4 bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
          >
            The difference you can feel
          </motion.h2>
          <motion.p
            className="text-[#ffe0b3] max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            File faster. Track smarter. Get verified help.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            className="bg-[#1a1a1a] brand-border border rounded-xl p-4 md:p-6 hover-zoom"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Operational Impact Over Time</h3>
              <span className="brand text-sm">Last 6 months</span>
            </div>
            <div style={{ width: "100%", height: 280 }}>
              <ResponsiveContainer>
                <AreaChart data={impactData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffcc99" stopOpacity={0.45} />
                      <stop offset="95%" stopColor="#ffcc99" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#222" strokeDasharray="3 3" />
                  <XAxis dataKey="month" stroke="#aaa" tickLine={false} axisLine={false} />
                  <YAxis stroke="#aaa" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "#111", border: "1px solid #333", color: "#fff" }} />
                  <Area type="monotone" dataKey="timeSaved" stroke="#ffcc99" fill="url(#colorTime)" name="Hours saved" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            className="bg-[#1a1a1a] brand-border border rounded-xl p-6 hover-zoom"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="brand text-sm mb-1">Hours saved</div>
                <div className="text-3xl font-bold text-white">
                  <AnimatedCounter value={980} suffix="+" />
                </div>
                <p className="text-secondary text-sm mt-1">Less admin. More advocacy.</p>
              </div>
              <div className="text-center">
                <div className="brand text-sm mb-1">Matches made</div>
                <div className="text-3xl font-bold text-white">
                  <AnimatedCounter value={420} suffix="+" />
                </div>
                <p className="text-secondary text-sm mt-1">Right expert, faster.</p>
              </div>
              <div className="text-center">
                <div className="brand text-sm mb-1">Cost saved</div>
                <div className="text-3xl font-bold text-white">
                  <AnimatedCounter value={7} prefix="₹" suffix="L+" />
                </div>
                <p className="text-secondary text-sm mt-1">Lower ops overhead.</p>
              </div>
            </div>

            <div className="mt-6 text-sm text-secondary">
              Directional figures from early pilots; results vary by practice.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

