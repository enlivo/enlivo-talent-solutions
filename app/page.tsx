import { Hero } from "@/components/sections/Hero";
import { RegulatedHiringStrip } from "@/components/sections/RegulatedHiringStrip";
import { Services } from "@/components/sections/Services";
import { ProcessPreview } from "@/components/sections/ProcessPreview";
import { WhyEnlivo } from "@/components/sections/WhyEnlivo";
import { Testimonial } from "@/components/sections/Testimonial";
import { CtaBand } from "@/components/sections/CtaBand";
import { CandidateCtaStrip } from "@/components/sections/CandidateCtaStrip";
import { organizationSchema } from "@/lib/organizationSchema";

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Hero />
      <RegulatedHiringStrip />
      <Services />
      <ProcessPreview />
      <WhyEnlivo />
      <Testimonial />
      <CtaBand />
      <CandidateCtaStrip />
    </main>
  );
}
