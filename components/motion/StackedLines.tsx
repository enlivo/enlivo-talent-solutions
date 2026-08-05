"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { EASE_OUT_EXPO, TEXT_REVEAL } from "./motionConstants";

/**
 * Clip-mask reveal for whole lines (a line moves as one unit, not word by
 * word) — used for subheads, paragraphs, and short list groups where a
 * per-word cascade would be too busy. Reuses the H2 stagger/duration pair.
 * Same auto-gate-on-scroll behavior as TextReveal unless `start` is passed.
 */
export function StackedLines({
  lines,
  start,
  className = "",
  lineClassName = "",
}: {
  lines: string[];
  start?: boolean;
  className?: string;
  lineClassName?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const { stagger, duration } = TEXT_REVEAL.h2;

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const shouldStart = start === undefined ? inView : start;

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <div key={i} className={`overflow-hidden pb-[0.14em] ${lineClassName}`}>
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: "115%" }}
            animate={
              shouldStart
                ? reduced
                  ? { opacity: 1 }
                  : { opacity: 1, y: "0%" }
                : undefined
            }
            transition={{
              duration: reduced ? 0.25 : duration,
              delay: reduced ? 0 : i * stagger,
              ease: EASE_OUT_EXPO,
            }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
