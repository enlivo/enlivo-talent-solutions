import type { MetadataRoute } from "next";
import { openRoles } from "@/lib/careers";
import { SITE_URL } from "@/lib/seo";

/** Static pages, plus every open role from lib/careers.ts — updates automatically as roles are added or removed. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    { path: "", priority: 1 },
    { path: "/industries", priority: 0.8 },
    { path: "/process", priority: 0.8 },
    { path: "/careers", priority: 0.8 },
    { path: "/candidates", priority: 0.7 },
    { path: "/contact", priority: 0.6 },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority,
  }));

  const jobEntries: MetadataRoute.Sitemap = openRoles.map((role) => ({
    url: `${SITE_URL}/careers/${role.slug}`,
    lastModified: new Date(role.datePosted),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...jobEntries];
}
