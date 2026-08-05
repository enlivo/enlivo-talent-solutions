import type { Metadata } from "next";

export const SITE_URL = "https://enlivotalentsolutions.com";
export const SITE_NAME = "Enlivo Talent Solutions";

/**
 * Shared per-page metadata builder: title/description plus a matching
 * canonical URL, Open Graph, and Twitter Card. `title` is just the
 * page-specific part — the root layout's title template appends
 * " | Enlivo Talent Solutions" automatically.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = "/images/logo-large.png",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
