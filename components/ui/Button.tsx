"use client";

import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MAGNETIC_SPRING } from "@/components/motion/motionConstants";

type Variant = "primary" | "ghost" | "ghost-on-teal";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-body text-sm font-medium transition-colors duration-200";

const variants: Record<Variant, string> = {
  primary: "bg-gold text-ink hover:bg-gold-light",
  ghost: "border border-ink/20 text-ink hover:border-ink",
  "ghost-on-teal": "border border-on-teal/30 text-on-teal hover:border-on-teal",
};

const arrowVariants = {
  rest: { x: 0 },
  hover: { x: 8 },
};

function TrailingArrow() {
  return (
    <motion.span
      variants={arrowVariants}
      transition={{ type: "spring", stiffness: MAGNETIC_SPRING.stiffness, damping: MAGNETIC_SPRING.damping }}
      className="inline-flex"
    >
      <ArrowRight size={16} />
    </motion.span>
  );
}

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
};

export function Button({
  children,
  href,
  variant = "primary",
  arrow = false,
  className = "",
  type = "button",
  onClick,
  disabled = false,
}: BaseProps & {
  href?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: () => void;
  disabled?: boolean;
}) {
  const classes = `${base} ${variants[variant]} ${disabled ? "pointer-events-none opacity-50" : ""} ${className}`;

  if (href) {
    return (
      <motion.div initial="rest" whileHover="hover" className="inline-block">
        <Link href={href} className={classes}>
          {children}
          {arrow && <TrailingArrow />}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      initial="rest"
      whileHover="hover"
      className={classes}
    >
      {children}
      {arrow && <TrailingArrow />}
    </motion.button>
  );
}
