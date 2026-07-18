import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getTranslations } from "next-intl/server";
import { ArticleForm } from "../_components/article-form";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = await getTranslations("admin");
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">{t("edit")}</h1>
      <ArticleForm
        authorId={article.authorId}
        initial={{
          id: article.id,
          slug: article.slug,
          titleEn: article.titleEn,
          titleAr: article.titleAr,
          excerptEn: article.excerptEn ?? "",
          excerptAr: article.excerptAr ?? "",
          contentEn: article.contentEn,
          contentAr: article.contentAr,
          coverImage: article.coverImage ?? "",
          tags: article.tags ?? "",
          published: article.published,
        }}
      />
    </div>
  );
}
