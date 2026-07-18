import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseRoutes = ["", "/#services", "/#portfolio", "/#pricing", "/#testimonials", "/#contact"];
  const locales = ["en", "ar"];

  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    baseRoutes.map((route) => ({
      url: `${SITE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1.0 : 0.7,
      alternates: {
        languages: {
          en: `${SITE_URL}/en${route}`,
          ar: `${SITE_URL}/ar${route}`,
        },
      },
    }))
  );

  const projects = await prisma.project.findMany({
    select: { slug: true, updatedAt: true },
  });
  const articles = await prisma.article.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  const projectEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    projects.map((p) => ({
      url: `${SITE_URL}/${locale}/#project-${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: {
          en: `${SITE_URL}/en/#project-${p.slug}`,
          ar: `${SITE_URL}/ar/#project-${p.slug}`,
        },
      },
    }))
  );

  const articleEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    articles.map((a) => ({
      url: `${SITE_URL}/${locale}/#article-${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.5,
      alternates: {
        languages: {
          en: `${SITE_URL}/en/#article-${a.slug}`,
          ar: `${SITE_URL}/ar/#article-${a.slug}`,
        },
      },
    }))
  );

  return [...staticEntries, ...projectEntries, ...articleEntries];
}
