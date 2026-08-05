import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { IndustryTile } from "@/components/sections/IndustryTile";
import { InViewGroup, InViewItem } from "@/components/motion/InView";
import { CARD_SPRING } from "@/components/motion/motionConstants";
import { industries } from "@/lib/industries";

export const metadata: Metadata = {
  title: "Industries | Enlivo Talent Solutions",
  description:
    "Enlivo recruits across technology, BFSI, healthcare, manufacturing, retail, logistics, media, and professional services.",
};

export default function IndustriesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Where We Work"
        lines={["Built for how your", "industry hires."]}
        subhead="Depth across the industries that build things: clinical operations, plant floors, and product teams."
      />

      <section className="bg-paper pb-28 lg:pb-36">
        <div className="container-px mx-auto max-w-content">
          <InViewGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry) => (
              <InViewItem key={industry.name} spring={CARD_SPRING}>
                <IndustryTile
                  name={industry.name}
                  roles={industry.roles}
                  description={industry.description}
                />
              </InViewItem>
            ))}
          </InViewGroup>
        </div>
      </section>
    </main>
  );
}
