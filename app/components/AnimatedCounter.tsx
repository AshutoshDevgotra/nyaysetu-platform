"use client";

import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  durationMs?: number;
  prefix?: string;
  suffix?: string;
}

export default function AnimatedCounter({ value, durationMs = 1200, prefix = "", suffix = "" }: AnimatedCounterProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const startValue = 0;
    const delta = value - startValue;
    let raf = 0;

    const tick = (t: number) => {
      const elapsed = t - start;
      const progress = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(startValue + delta * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, durationMs]);

  return <span>{prefix}{display.toLocaleString()}{suffix}</span>;
}

