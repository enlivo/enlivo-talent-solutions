import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { CareersList } from "@/components/sections/CareersList";

export const metadata: Metadata = {
  title: "Careers | Enlivo Talent Solutions",
  description: "Open roles at Enlivo Talent Solutions. Join the team.",
};

export default function CareersPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Join The Team"
        lines={["Open roles at", "Enlivo."]}
        subhead="We're hiring for our own team: the people who source, place, and support every Enlivo client."
      />

      <section className="bg-paper pb-28 lg:pb-36">
        <div className="container-px mx-auto max-w-content">
          <CareersList />
        </div>
      </section>
    </main>
  );
}
