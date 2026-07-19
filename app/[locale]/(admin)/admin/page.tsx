import { prisma } from "@/lib/db";
import { getTranslations } from "next-intl/server";
import {
  Users as UsersIcon,
  FileText,
  Briefcase,
  MessageSquare,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const t = await getTranslations("admin");
  const [userCount, articleCount, projectCount, unreadMessages, recent] =
    await Promise.all([
      prisma.user.count().catch(() => 0),
      prisma.article.count().catch(() => 0),
      prisma.project.count().catch(() => 0),
      prisma.message.count({ where: { read: false } }).catch(() => 0),
      prisma.message
        .findMany({ orderBy: { createdAt: "desc" }, take: 5 })
        .catch(() => []),
    ]);

  const stats = [
    { label: t("statUsers"), value: userCount, icon: UsersIcon, color: "text-blue-500" },
    { label: t("statArticles"), value: articleCount, icon: FileText, color: "text-purple-500" },
    { label: t("statProjects"), value: projectCount, icon: Briefcase, color: "text-pink-500" },
    { label: t("statMessages"), value: unreadMessages, icon: MessageSquare, color: "text-amber-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t("dashboard")}</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="p-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                    <p className="mt-2 text-3xl font-semibold tracking-tight">{s.value}</p>
                  </div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-muted/50 ${s.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="p-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Activity className="h-4 w-4" />
            {t("recentActivity")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recent.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t("noResults")}</p>
          ) : (
            <ul className="divide-y divide-border">
              {recent.map((m) => (
                <li key={m.id} className="flex items-start justify-between gap-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{m.name}</p>
                    <p className="line-clamp-1 text-sm text-muted-foreground">{m.message}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">{formatDate(m.createdAt, "en")}</div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
