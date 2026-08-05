import { Briefcase, Users, Clock, Layers } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { DuotoneImage } from "@/components/ui/DuotoneImage";
import { SectionTexture } from "@/components/ui/SectionTexture";
import { TextReveal } from "@/components/motion/TextReveal";
import { InViewGroup, InViewItem } from "@/components/motion/InView";
import { CARD_SPRING } from "@/components/motion/motionConstants";

const services = [
  {
    title: "Executive Search",
    description: "Leadership and board-level hires for regulated businesses, handled with full discretion.",
    icon: Briefcase,
  },
  {
    title: "Permanent Staffing",
    description: "Full-time talent, background-verified and matched to your compliance requirements.",
    icon: Users,
  },
  {
    title: "Contract & Temp Staffing",
    description: "Scale audit, risk, and ops teams up or down without compromising on vetting standards.",
    icon: Clock,
  },
  {
    title: "RPO",
    description: "Your hiring function, fully embedded, built around your existing compliance workflows.",
    sub: "Recruitment Process Outsourcing",
    icon: Layers,
  },
];

export function Services() {
  return (
    <section id="services" className="relative isolate bg-paper py-28 lg:py-36">
      <SectionTexture corner="top-right" />
      <div className="relative z-10 container-px mx-auto max-w-content">
        <div className="relative mb-12 h-48 w-full overflow-hidden rounded-2xl lg:h-64">
          <DuotoneImage
            src="/images/services-banner.jpg"
            alt="Corporate team collaborating in an office, representing Enlivo's executive search and staffing services"
            overlayOpacity={0.78}
            className="h-full w-full"
          />
        </div>

        <Eyebrow>What We Do</Eyebrow>
        <h2 className="mt-5 max-w-xl text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-tight text-ink">
          <TextReveal
            lines={["Four ways to get the right", "people in the room."]}
            scale="h2"
            as="span"
          />
        </h2>

        <InViewGroup className="mt-16 grid gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <InViewItem key={service.title} spring={CARD_SPRING}>
              <Card className="h-full">
                {service.sub && (
                  <Eyebrow tone="ink-soft" className="mb-3 block">
                    {service.sub}
                  </Eyebrow>
                )}
                <service.icon size={22} className="text-gold-deep" strokeWidth={1.75} />
                <h3 className="mt-4 font-display text-2xl font-medium text-ink">
                  {service.title}
                </h3>
                <p className="mt-3 text-ink-soft">{service.description}</p>
              </Card>
            </InViewItem>
          ))}
        </InViewGroup>
      </div>
    </section>
  );
}
