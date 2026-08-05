import { ElementType, ReactNode } from "react";

export function Eyebrow({
  children,
  className = "",
  tone = "gold",
  as = "span",
}: {
  children: ReactNode;
  className?: string;
  tone?: "gold" | "ink-soft" | "on-teal";
  as?: ElementType;
}) {
  const toneClass = {
    gold: "text-gold-deep",
    "ink-soft": "text-ink-soft",
    "on-teal": "text-on-teal/70",
  }[tone];

  const Tag = as;

  return <Tag className={`mono-label ${toneClass} ${className}`}>{children}</Tag>;
}
