"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { CARD_HOVER_SPRING } from "@/components/motion/motionConstants";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.015, boxShadow: "inset 3px 0 0 0 #C9A24A" }}
      transition={{
        type: "spring",
        stiffness: CARD_HOVER_SPRING.stiffness,
        damping: CARD_HOVER_SPRING.damping,
      }}
      className={`rounded-2xl border border-line bg-card p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
}
