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

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const projects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    take: 6,
  });

  return (
    <>
      <Hero />
      <Services />
      <Portfolio
        projects={projects.map((p) => ({
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
        }))}
      />
      <Pricing />
      <Stats />
      <Testimonials />
      <Cta />
      <Contact />
    </>
  );
}
