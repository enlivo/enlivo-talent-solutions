import Image from "next/image";

/** Teal duotone treatment: desaturated photo + teal multiply overlay, for consistent photography across sections. */
export function DuotoneImage({
  src,
  alt,
  className = "",
  overlayOpacity = 0.65,
  priority = false,
  sizes = "100vw",
}: {
  src: string;
  alt: string;
  className?: string;
  overlayOpacity?: number;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover grayscale-[35%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-teal"
        style={{ opacity: overlayOpacity, mixBlendMode: "multiply" }}
      />
    </div>
  );
}
