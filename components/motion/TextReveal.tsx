"use client";

import { ElementType, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { EASE_OUT_EXPO, TEXT_REVEAL } from "./motionConstants";

/**
 * Clip-mask word-by-word reveal. Each word sits in an overflow-hidden box;
 * the inner span slides up from translateY(115%) into place.
 *
 * Leave `start` unset for the default behavior: the reveal gates itself on
 * scroll visibility (once, ~40% in view) so below-the-fold headlines don't
 * finish animating off-screen before anyone scrolls to them. Pass an
 * explicit boolean to override that — e.g. the hero's H1 gates on the
 * loader's `ready` state instead.
 */
export function TextReveal({
  lines,
  start,
  scale = "headline",
  as = "span",
  className = "",
}: {
  lines: string[];
  start?: boolean;
  scale?: "headline" | "h2";
  as?: ElementType;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const { stagger, duration } = TEXT_REVEAL[scale];
  const Tag = as;

  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const shouldStart = start === undefined ? inView : start;

  let wordIndex = 0;

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, li) => (
        <span key={li} className="flex flex-wrap">
          {line.split(" ").map((word) => {
            const i = wordIndex++;
            return (
              <span
                key={i}
                className="inline-block overflow-hidden pb-[0.14em]"
              >
                <motion.span
                  className="inline-block"
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
                  {word}&nbsp;
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
