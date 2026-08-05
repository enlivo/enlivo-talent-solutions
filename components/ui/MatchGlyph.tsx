"use client";

import { useId } from "react";

/**
 * The "Match" mark — two overlapping circles (a vesica), the signature
 * motif used as the logomark, and again as a bullet/divider glyph.
 */
export function MatchGlyph({
  size = 28,
  className = "",
  strokeColor = "currentColor",
  lensColor = "#C9A24A",
}: {
  size?: number;
  className?: string;
  strokeColor?: string;
  lensColor?: string;
}) {
  const clipId = useId();
  const w = size * 1.55;
  const h = size;
  const r = size * 0.42;
  const cx1 = w * 0.36;
  const cx2 = w * 0.64;
  const cy = h / 2;

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <clipPath id={clipId}>
        <circle cx={cx1} cy={cy} r={r} />
      </clipPath>
      <circle cx={cx2} cy={cy} r={r} fill={lensColor} clipPath={`url(#${clipId})`} />
      <circle cx={cx1} cy={cy} r={r} fill="none" stroke={strokeColor} strokeWidth={size * 0.045} />
      <circle cx={cx2} cy={cy} r={r} fill="none" stroke={strokeColor} strokeWidth={size * 0.045} />
    </svg>
  );
}
