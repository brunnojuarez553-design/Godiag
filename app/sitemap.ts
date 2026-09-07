import type { MetadataRoute } from "next";
import { SITE_URL, seoServices } from "@/lib/seo-services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...seoServices.map((service) => ({
      url: `${SITE_URL}/servicios/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
}
