import { ShieldCheck, Lock, Search, Users } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { SectionTexture } from "@/components/ui/SectionTexture";
import { InViewGroup, InViewItem } from "@/components/motion/InView";
import { CARD_SPRING } from "@/components/motion/motionConstants";

const items = [
  {
    title: "Background verification",
    description: "BGV built into every shortlist, as standard.",
    icon: ShieldCheck,
  },
  {
    title: "Confidential by default",
    description: "NDAs and confidential search as standard.",
    icon: Lock,
  },
  {
    title: "Sector-specific vetting",
    description: "For risk, compliance, and audit roles.",
    icon: Search,
  },
  {
    title: "Dedicated pod",
    description: "The same two or three people, every time.",
    icon: Users,
  },
];

export function RegulatedHiringStrip() {
  return (
    <section className="relative isolate bg-paper-dim py-20 lg:py-24">
      <SectionTexture corner="bottom-right" />
      <div className="relative z-10 container-px mx-auto max-w-content">
        <Eyebrow as="h2">Built for Regulated Hiring</Eyebrow>

        <InViewGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <InViewItem key={item.title} spring={CARD_SPRING}>
              <Card className="h-full">
                <item.icon size={22} className="text-gold-deep" strokeWidth={1.75} />
                <h3 className="mt-4 font-display text-lg font-medium text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-ink-soft">{item.description}</p>
              </Card>
            </InViewItem>
          ))}
        </InViewGroup>
      </div>
    </section>
  );
}
