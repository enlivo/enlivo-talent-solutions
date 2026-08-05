"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Magnetic } from "@/components/motion/Magnetic";
import { IN_VIEW_SPRING } from "@/components/motion/motionConstants";
import type { processSteps } from "@/lib/processSteps";

export function ProcessStepRow({ step }: { step: (typeof processSteps)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <div ref={ref} className="relative flex gap-8 py-10 lg:gap-10">
      <div className="relative flex w-10 shrink-0 justify-center">
        <motion.span
          initial={{ scale: 0.4, backgroundColor: "#FFFFFF" }}
          animate={
            inView
              ? { scale: 1, backgroundColor: "#C9A24A" }
              : { scale: 0.4, backgroundColor: "#FFFFFF" }
          }
          transition={{
            type: "spring",
            stiffness: IN_VIEW_SPRING.stiffness,
            damping: IN_VIEW_SPRING.damping,
          }}
          className="z-10 mt-1.5 h-3 w-3 rounded-full border-2 border-ink"
        />
      </div>

      <div className="flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
            {step.title}
          </h2>
          <Magnetic>
            <span className="hidden h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink-soft lg:flex">
              <ArrowRight size={16} />
            </span>
          </Magnetic>
        </div>
        <p className="mt-3 max-w-xl text-ink-soft">{step.paragraph}</p>
        {/* Figures below are illustrative — TODO: replace with real, current SLAs/metrics */}
        <p className="mono-label mt-4 text-ink-soft/70">{step.stat}</p>
      </div>
    </div>
  );
}
