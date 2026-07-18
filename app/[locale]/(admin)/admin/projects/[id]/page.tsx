import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getTranslations } from "next-intl/server";
import { ProjectForm } from "../_components/project-form";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = await getTranslations("admin");
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">{t("edit")}</h1>
      <ProjectForm
        initial={{
          id: project.id,
          slug: project.slug,
          titleEn: project.titleEn,
          titleAr: project.titleAr,
          descriptionEn: project.descriptionEn,
          descriptionAr: project.descriptionAr,
          image: project.image ?? "",
          category: project.category ?? "",
          technologies: project.technologies ?? "",
          liveUrl: project.liveUrl ?? "",
          githubUrl: project.githubUrl ?? "",
          featured: project.featured,
          order: project.order,
        }}
      />
    </div>
  );
}
