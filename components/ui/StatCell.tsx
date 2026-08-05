"use client";

import { InViewItem } from "@/components/motion/InView";
import { STAT_CELL_SPRING } from "@/components/motion/motionConstants";

/** Must be used inside an <InViewGroup> (or any variant-propagating parent). */
export function StatCell({
  value,
  label,
  tone = "light",
}: {
  value: string;
  label: string;
  tone?: "light" | "dark" | "gold";
}) {
  const valueClass =
    tone === "gold" ? "text-gold" : tone === "dark" ? "text-on-teal" : "text-ink";
  const labelClass = tone === "dark" || tone === "gold" ? "text-on-teal/60" : "text-ink-soft";

  return (
    <InViewItem spring={STAT_CELL_SPRING} className="flex items-baseline gap-2.5">
      <span className={`font-display text-2xl ${valueClass}`}>{value}</span>
      <span className={`mono-label ${labelClass}`}>{label}</span>
    </InViewItem>
  );
}
