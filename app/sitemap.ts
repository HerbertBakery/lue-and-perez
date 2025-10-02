// app/sitemap.ts
import type { MetadataRoute } from "next";

const SITE_URL = "https://www.lueandperez.com"; // set to your live domain

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/services",
    "/services/export-logistics",
    "/services/consolidation",
    "/services/sourcing",
    "/services/manufacturing",
    "/caribbean-food-exports",
  ];
  return routes.map((r) => ({
    url: `${SITE_URL}${r}`,
    changeFrequency: r === "/" ? "weekly" : "monthly",
    priority: r === "/" ? 1.0 : 0.8,
  }));
}
