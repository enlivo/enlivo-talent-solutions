const blobPosition = {
  "top-right": "-top-40 -right-40",
  "bottom-left": "-bottom-40 -left-40",
  "top-left": "-top-40 -left-40",
  "bottom-right": "-bottom-40 -right-40",
} as const;

/**
 * Barely-there dot-grid + soft blob, for plain light sections that read as empty.
 * Sits behind content — the parent section MUST have both `relative` and `isolate`
 * (not just `relative`) so it establishes its own stacking context. Without `isolate`,
 * a child's negative z-index resolves against a distant ancestor context instead of
 * this section, and the texture renders behind the entire page (invisible) rather
 * than just behind this section's own content.
 */
export function SectionTexture({
  dot = "#C9A24A",
  dotOpacity = 0.16,
  blob = "#0F3B3A",
  blobOpacity = 0.13,
  corner = "top-right",
}: {
  dot?: string;
  dotOpacity?: number;
  blob?: string;
  blobOpacity?: number;
  corner?: keyof typeof blobPosition;
}) {
  const dotRgb = hexToRgb(dot);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(${dotRgb},${dotOpacity}) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className={`absolute ${blobPosition[corner]} h-[700px] w-[700px] rounded-full blur-3xl`}
        style={{ backgroundColor: blob, opacity: blobOpacity }}
      />
    </div>
  );
}

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `${r},${g},${b}`;
}
