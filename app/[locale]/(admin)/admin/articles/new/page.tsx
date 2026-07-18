import { getTranslations } from "next-intl/server";
import { ArticleForm } from "../_components/article-form";
import { auth } from "@/auth";

export default async function NewArticlePage() {
  const t = await getTranslations("admin");
  const session = await auth();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">
        {t("newArticle")}
      </h1>
      <ArticleForm authorId={session?.user?.id ?? ""} />
    </div>
  );
}
