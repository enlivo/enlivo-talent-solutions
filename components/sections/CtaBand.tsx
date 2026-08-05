import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/motion/Magnetic";
import { TextReveal } from "@/components/motion/TextReveal";

export function CtaBand() {
  return (
    <section className="border-t border-line-on-teal bg-teal-2 py-24 lg:py-32">
      <div className="container-px mx-auto flex max-w-content flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
        <h2 className="max-w-lg text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-tight text-on-teal">
          <TextReveal lines={["Hiring for a regulated business?", "Let's talk."]} scale="h2" as="span" />
        </h2>
        <Magnetic>
          <Button href="/contact" variant="primary" arrow>
            Talk to our team
          </Button>
        </Magnetic>
      </div>
    </section>
  );
}
