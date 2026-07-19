import { setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/db";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Portfolio } from "@/components/sections/portfolio";
import { Pricing } from "@/components/sections/pricing";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { Cta } from "@/components/sections/cta";
import { Contact } from "@/components/sections/contact";

// Force dynamic so the DB query runs at request time, not build time.
// Also lets the page render gracefully if the DB is briefly unavailable.
export const dynamic = "force-dynamic";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Try to load projects; if DB is unavailable, fall back to empty list.
  let projects: Array<{
    id: string;
    slug: string;
    titleEn: string;
    titleAr: string;
    descriptionEn: string;
    descriptionAr: string;
    image: string | null;
    category: string | null;
    technologies: string | null;
    liveUrl: string | null;
    githubUrl: string | null;
  }> = [];
  try {
    const rows = await prisma.project.findMany({
      orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
      take: 6,
    });
    projects = rows.map((p) => ({
      id: p.id,
      slug: p.slug,
      titleEn: p.titleEn,
      titleAr: p.titleAr,
      descriptionEn: p.descriptionEn,
      descriptionAr: p.descriptionAr,
      image: p.image,
      category: p.category,
      technologies: p.technologies,
      liveUrl: p.liveUrl,
      githubUrl: p.githubUrl,
    }));
  } catch {
    // DB not ready yet — empty state will be shown.
  }

  return (
    <>
      <Hero />
      <Services />
      <Portfolio projects={projects} />
      <Pricing />
      <Stats />
      <Testimonials />
      <Cta />
      <Contact />
    </>
  );
}
