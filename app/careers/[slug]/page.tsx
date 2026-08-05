import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { ApplicationForm } from "@/components/sections/ApplicationForm";
import { SectionTexture } from "@/components/ui/SectionTexture";
import { openRoles } from "@/lib/careers";

export function generateStaticParams() {
  return openRoles.map((role) => ({ slug: role.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const role = openRoles.find((r) => r.slug === params.slug);
  if (!role) return {};

  const title = `${role.title} | Enlivo Talent Solutions`;
  const description = role.summary;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "Enlivo Talent Solutions",
      type: "website",
      images: ["/images/logo-large.png"],
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default function JobPage({ params }: { params: { slug: string } }) {
  const role = openRoles.find((r) => r.slug === params.slug);
  if (!role) notFound();

  return (
    <main>
      <PageHeader eyebrow={role.department} lines={[role.title]} subhead={role.summary} />

      <section className="relative isolate bg-paper pb-28 lg:pb-36">
        <SectionTexture corner="top-right" />
        <div className="relative z-10 container-px mx-auto grid max-w-content gap-16 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Link
              href="/careers"
              className="mono-label inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-ink"
            >
              <ArrowLeft size={14} /> All open roles
            </Link>

            <p className="mono-label mt-8 text-ink-soft">
              {role.location} · {role.type}
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {role.description}
            </p>
          </div>

          <div>
            <ApplicationForm jobSlug={role.slug} jobTitle={role.title} />
          </div>
        </div>
      </section>
    </main>
  );
}
