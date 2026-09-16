import { PageHeader } from "@/components/sections/PageHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Enlivo Talent Solutions for BFSI, NBFC, and insurance hiring needs. Executive search, permanent staffing, contract staffing, and RPO across India.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main>
      <PageHeader eyebrow="Let's Talk" lines={["Hiring for a regulated business?", "Let's talk."]} />

      <section className="bg-paper pb-28 lg:pb-36">
        <div className="container-px mx-auto grid max-w-content gap-16 lg:grid-cols-[1.2fr_1fr]">
          <ContactForm />

          <div>
            <h2 className="font-display text-xl font-medium text-ink">
              Reach us directly
            </h2>
            <div className="mt-4">
              <p className="font-display text-base font-medium text-ink">
                Enlivo Talent Solutions
              </p>
            </div>
            <div className="mt-4 space-y-1 text-ink-soft">
              <p>#31 Srushti, Krishnagiri Police Colony, Vinayaka Layout, Kodipaly, Kengeri, Bengaluru - 560060</p>
              <p className="mt-3">akshay@enlivotalentsolutions.com</p>
              <p>contact@enlivotalentsolutions.com</p>
              <p className="mt-3">+91 78993 87578</p>
            </div>

            <h2 className="font-display text-xl font-medium text-ink mt-10">
              Response time
            </h2>
            <p className="mt-4 max-w-sm text-ink-soft">
              We reply within one business day. For urgent hiring needs,
              mention your timeline in the message and we&rsquo;ll prioritize
              accordingly.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
