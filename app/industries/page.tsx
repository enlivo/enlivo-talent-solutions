import { PageHeader } from "@/components/sections/PageHeader";
import { IndustryTile } from "@/components/sections/IndustryTile";
import { InViewGroup, InViewItem } from "@/components/motion/InView";
import { CARD_SPRING } from "@/components/motion/motionConstants";
import { industries } from "@/lib/industries";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "BFSI, NBFC & Insurance Recruitment Across Industries",
  description:
    "Enlivo recruits for BFSI, NBFC, insurance, fintech, technology, and healthcare clients across India, with sector-specific vetting for risk, compliance, and audit roles.",
  path: "/industries",
});

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
          <h2 className="sr-only">Industries We Recruit For</h2>
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
