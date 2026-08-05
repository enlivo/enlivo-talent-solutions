"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

/**
 * Scroll-linked transform for an element as it moves through the viewport.
 * Scoped to its own container via useScroll's `target`, never a page-level
 * scroll-event listener. Used for the hero visual's drift and, via the same
 * useScroll/useTransform technique, the nav's scroll-linked background.
 */
export function ParallaxLayer({
  children,
  className = "",
  yRangePct = [0, 8],
}: {
  children: ReactNode;
  className?: string;
  yRangePct?: [number, number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : [`${yRangePct[0]}%`, `${yRangePct[1]}%`]
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
