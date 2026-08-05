import { MatchGlyph } from "@/components/ui/MatchGlyph";
import { SectionTexture } from "@/components/ui/SectionTexture";
import { TextReveal } from "@/components/motion/TextReveal";
import { InViewGroup, InViewItem } from "@/components/motion/InView";

const differentiators = [
  {
    title: "Human-vetted, not just keyword-matched",
    description: "Every shortlist is reviewed by a person who's worked in regulated hiring.",
  },
  {
    title: "Speed without shortcuts",
    description: "Structured process, not a rushed one. Compliance never gets skipped for speed.",
  },
  {
    title: "A dedicated hiring pod per client",
    description: "The same two or three people, every time.",
  },
  {
    title: "Support after the offer",
    description: "A 90-day check-in built into every placement.",
  },
];

export function WhyEnlivo() {
  return (
    <section className="relative isolate bg-paper py-28 lg:py-36">
      <SectionTexture corner="top-left" />
      <div className="relative z-10 container-px mx-auto grid max-w-content gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-24">
        <div>
          <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-tight text-ink">
            <TextReveal lines={["Recruitment that respects", "your time."]} scale="h2" as="span" />
          </h2>
        </div>

        <InViewGroup className="flex flex-col divide-y divide-line">
          {differentiators.map((item) => (
            <InViewItem key={item.title} className="flex gap-5 py-6 first:pt-0">
              <MatchGlyph size={20} className="mt-1.5 shrink-0 text-ink-soft" />
              <div>
                <h3 className="font-display text-xl font-medium text-ink">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-ink-soft">{item.description}</p>
              </div>
            </InViewItem>
          ))}
        </InViewGroup>
      </div>
    </section>
  );
}
