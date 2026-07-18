import { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { LoginForm } from "./login-form";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tAuth = await getTranslations({ locale, namespace: "auth" });

  return (
    <Card glass className="w-full max-w-md p-0">
      <CardContent className="p-8 sm:p-10">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-brand-400)] to-[var(--color-brand-700)] text-white shadow-glow">
            <Sparkles className="h-6 w-6" />
          </span>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">
            {tCommon("brand")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{tAuth("login")}</p>
        </div>
        <Suspense fallback={null}>
          <LoginForm locale={locale} />
        </Suspense>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          {tAuth("demoHint")}
        </p>
      </CardContent>
    </Card>
  );
}
