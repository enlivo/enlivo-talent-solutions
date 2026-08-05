import type { OpenRole } from "./careers";
import { SITE_URL } from "./seo";

const EMPLOYMENT_TYPE_MAP: Record<string, string> = {
  "full-time": "FULL_TIME",
  "part-time": "PART_TIME",
  contract: "CONTRACTOR",
  temporary: "TEMPORARY",
  intern: "INTERN",
};

function toEmploymentType(type: string): string {
  return EMPLOYMENT_TYPE_MAP[type.toLowerCase()] ?? "OTHER";
}

/** JobPosting JSON-LD (schema.org) for a single role, for Google job search eligibility. */
export function buildJobPostingSchema(role: OpenRole) {
  const isRemote = role.location.toLowerCase().includes("remote");

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: role.title,
    description: role.description,
    datePosted: role.datePosted,
    employmentType: toEmploymentType(role.type),
    hiringOrganization: {
      "@type": "Organization",
      name: "Enlivo Talent Solutions",
      sameAs: SITE_URL,
      logo: `${SITE_URL}/images/logo-large.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
    },
    ...(isRemote
      ? {
          jobLocationType: "TELECOMMUTE",
          applicantLocationRequirements: {
            "@type": "Country",
            name: "India",
          },
        }
      : {}),
  };
}
