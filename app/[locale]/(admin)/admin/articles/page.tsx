import Link from "next/link";
import { prisma } from "@/lib/db";
import { getTranslations } from "next-intl/server";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { deleteArticle } from "../_actions/articles";

export default async function ArticlesPage() {
  const t = await getTranslations("admin");
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true, email: true } } },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t("articles")}
        </h1>
        <Button asChild variant="gradient">
          <Link href="/en/admin/articles/new">
            <Plus className="h-4 w-4" />
            {t("newArticle")}
          </Link>
        </Button>
      </div>

      {articles.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">{t("noResults")}</p>
        </Card>
      ) : (
        <Card className="overflow-hidden p-0">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-muted/30 text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 text-start font-medium">Title</th>
                    <th className="px-4 py-3 text-start font-medium">Status</th>
                    <th className="px-4 py-3 text-start font-medium">Author</th>
                    <th className="px-4 py-3 text-start font-medium">Date</th>
                    <th className="px-4 py-3 text-end font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {articles.map((article) => (
                    <tr key={article.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <div className="line-clamp-1 font-medium">
                          {article.titleEn}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          /{article.slug}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                            article.published
                              ? "bg-green-500/10 text-green-600 dark:text-green-400"
                              : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          }`}
                        >
                          {article.published ? t("published") : t("draft")}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {article.author.name ?? article.author.email}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {formatDate(article.createdAt, "en")}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Button asChild variant="ghost" size="icon">
                            <Link
                              href={`/en/admin/articles/${article.id}`}
                              aria-label={t("edit")}
                            >
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <form
                            action={async () => {
                              "use server";
                              await deleteArticle(article.id);
                            }}
                          >
                            <Button
                              type="submit"
                              variant="ghost"
                              size="icon"
                              aria-label={t("delete")}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
