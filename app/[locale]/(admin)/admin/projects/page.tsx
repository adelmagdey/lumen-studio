import Link from "next/link";
import { prisma } from "@/lib/db";
import { getTranslations } from "next-intl/server";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { deleteProject } from "../_actions/projects";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const t = await getTranslations("admin");
  const projects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { order: "asc" }],
  }).catch(() => []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t("projects")}
        </h1>
        <Button asChild variant="gradient">
          <Link href="/en/admin/projects/new">
            <Plus className="h-4 w-4" />
            {t("newProject")}
          </Link>
        </Button>
      </div>

      {projects.length === 0 ? (
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
                    <th className="px-4 py-3 text-start font-medium">Category</th>
                    <th className="px-4 py-3 text-start font-medium">Featured</th>
                    <th className="px-4 py-3 text-start font-medium">Order</th>
                    <th className="px-4 py-3 text-end font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <div className="line-clamp-1 font-medium">
                          {project.titleEn}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          /{project.slug}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {project.category ?? "—"}
                      </td>
                      <td className="px-4 py-3">
                        {project.featured ? "⭐" : "—"}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {project.order}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Button asChild variant="ghost" size="icon">
                            <Link
                              href={`/en/admin/projects/${project.id}`}
                              aria-label={t("edit")}
                            >
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <form
                            action={async () => {
                              "use server";
                              await deleteProject(project.id);
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
