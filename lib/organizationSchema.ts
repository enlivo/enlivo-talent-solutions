import { SITE_URL } from "./seo";

/**
 * Organization JSON-LD for the homepage. `sameAs` is intentionally omitted —
 * the Footer's current LinkedIn link points at linkedin.com's homepage, not
 * a real Enlivo company profile, so including it here would be inaccurate
 * structured data. Add real social profile URLs to `sameAs` once they exist.
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Enlivo Talent Solutions",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-large.png`,
  description:
    "Enlivo Talent Solutions places background-verified talent for BFSI, NBFC, and insurance clients across India. Executive search, permanent staffing, contract staffing, and RPO, built around compliance requirements.",
  parentOrganization: {
    "@type": "Organization",
    name: "Enlivo Global Tech Solutions Private Limited",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "#31 Srushti, Krishnagiri Police Colony, Vinayaka Layout, Kodipaly, Kengeri",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560060",
    addressCountry: "IN",
  },
};
