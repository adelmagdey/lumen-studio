import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

export default async function NotFound() {
  const t = await getTranslations("errors");
  const tCommon = await getTranslations("common");

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <p className="font-mono text-sm uppercase tracking-wider text-muted-foreground">
          404
        </p>
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          {t("notFound")}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-pretty text-muted-foreground">
          {t("notFoundDesc")}
        </p>
        <div className="mt-8">
          <Button asChild variant="gradient" size="lg">
            <Link href="/en">{tCommon("backToHome")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
