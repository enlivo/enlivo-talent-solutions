"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CARD_HOVER_SPRING } from "@/components/motion/motionConstants";

export function IndustryTile({
  name,
  roles,
  description,
}: {
  name: string;
  roles: string;
  description: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex min-h-[220px] flex-col justify-between rounded-2xl border border-line bg-card p-7"
    >
      <div>
        <h3 className="font-display text-xl font-medium leading-tight text-ink">
          {name}
        </h3>
        <p className="mt-3 text-sm text-ink-soft">{description}</p>
      </div>
      <motion.span
        initial={{ opacity: 0, y: 6 }}
        animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={{
          type: "spring",
          stiffness: CARD_HOVER_SPRING.stiffness,
          damping: CARD_HOVER_SPRING.damping,
        }}
        className="mono-label mt-5 text-gold-deep"
      >
        {roles}
      </motion.span>
    </div>
  );
}
