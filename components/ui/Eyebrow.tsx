import { ReactNode } from "react";

export function Eyebrow({
  children,
  className = "",
  tone = "gold",
}: {
  children: ReactNode;
  className?: string;
  tone?: "gold" | "ink-soft" | "on-teal";
}) {
  const toneClass = {
    gold: "text-gold-deep",
    "ink-soft": "text-ink-soft",
    "on-teal": "text-on-teal/70",
  }[tone];

  return <span className={`mono-label ${toneClass} ${className}`}>{children}</span>;
}
