import { PageHeader } from "@/components/sections/PageHeader";
import { CareersList } from "@/components/sections/CareersList";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Careers",
  description:
    "Join the Enlivo Talent Solutions team. We're hiring sourcing, client success, and operations talent to build BFSI and NBFC hiring pipelines across India.",
  path: "/careers",
});

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
          <h2 className="sr-only">Open Roles</h2>
          <CareersList />
        </div>
      </section>
    </main>
  );
}
