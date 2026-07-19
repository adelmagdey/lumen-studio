import { prisma } from "@/lib/db";
import { getTranslations } from "next-intl/server";
import { SettingsForm } from "./_components/settings-form";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const t = await getTranslations("admin");
  const settings = await prisma.setting.findMany().catch(() => []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">
        {t("settings")}
      </h1>
      <SettingsForm
        initial={settings.map((s) => ({ key: s.key, value: s.value }))}
      />
    </div>
  );
}
