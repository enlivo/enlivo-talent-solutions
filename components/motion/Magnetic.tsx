"use client";

import { MouseEvent, ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { useIsNarrowViewport } from "@/lib/useIsNarrowViewport";
import { MAGNETIC_MAX_PULL, MAGNETIC_SPRING } from "./motionConstants";

/**
 * Hover-spring wrapper for interactive elements (primary buttons, the
 * process-row arrow). Disabled under prefers-reduced-motion and below the
 * 768px breakpoint regardless of motion preference.
 */
export function Magnetic({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const narrow = useIsNarrowViewport();
  const disabled = reducedMotion || narrow;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, MAGNETIC_SPRING);
  const springY = useSpring(y, MAGNETIC_SPRING);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (disabled || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const relX = event.clientX - (bounds.left + bounds.width / 2);
    const relY = event.clientY - (bounds.top + bounds.height / 2);
    x.set((relX / (bounds.width / 2)) * MAGNETIC_MAX_PULL);
    y.set((relY / (bounds.height / 2)) * MAGNETIC_MAX_PULL);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={disabled ? undefined : { x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
