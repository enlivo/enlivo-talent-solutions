import { Hero } from "@/components/sections/Hero";
import { RegulatedHiringStrip } from "@/components/sections/RegulatedHiringStrip";
import { Services } from "@/components/sections/Services";
import { ProcessPreview } from "@/components/sections/ProcessPreview";
import { WhyEnlivo } from "@/components/sections/WhyEnlivo";
import { Testimonial } from "@/components/sections/Testimonial";
import { CtaBand } from "@/components/sections/CtaBand";
import { CandidateCtaStrip } from "@/components/sections/CandidateCtaStrip";

export default function Home() {
  return (
    <main>
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
