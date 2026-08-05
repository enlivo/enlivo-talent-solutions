"use client";

import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { IN_VIEW_SPRING, IN_VIEW_STAGGER } from "./motionConstants";

type Spring = { stiffness: number; damping: number };

function riseVariants(spring: Spring, reduced: boolean): Variants {
  return {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduced
        ? { duration: 0.25 }
        : { type: "spring", stiffness: spring.stiffness, damping: spring.damping },
    },
  };
}

/** Single-element scroll-triggered rise-in. */
export function InView({
  children,
  className = "",
  spring = IN_VIEW_SPRING,
  amount = 0.3,
}: {
  children: ReactNode;
  className?: string;
  spring?: Spring;
  amount?: number;
}) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={riseVariants(spring, reduced)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Parent stagger container — pairs with <InViewItem>. */
export function InViewGroup({
  children,
  className = "",
  amount = 0.2,
  stagger = IN_VIEW_STAGGER,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  stagger?: number;
}) {
  const parent: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
  };
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={parent}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Child of <InViewGroup> — inherits hidden/visible from the parent's stagger. */
export function InViewItem({
  children,
  className = "",
  spring = IN_VIEW_SPRING,
}: {
  children: ReactNode;
  className?: string;
  spring?: Spring;
}) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div variants={riseVariants(spring, reduced)} className={className}>
      {children}
    </motion.div>
  );
}
