import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextReveal } from "@/components/motion/TextReveal";

export function PageHeader({
  eyebrow,
  lines,
  subhead,
}: {
  eyebrow: string;
  lines: string[];
  subhead?: string;
}) {
  return (
    <section className="bg-paper pb-16 pt-28 lg:pb-24 lg:pt-32">
      <div className="container-px mx-auto max-w-content">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-2xl font-display font-medium leading-[0.98] tracking-tight text-ink text-[clamp(2.5rem,5.5vw,4.5rem)]">
          <TextReveal lines={lines} scale="headline" as="span" />
        </h1>
        {subhead && (
          <p className="mt-6 max-w-xl text-lg text-ink-soft">{subhead}</p>
        )}
      </div>
    </section>
  );
}
