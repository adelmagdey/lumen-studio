import { prisma } from "@/lib/db";
import { getTranslations } from "next-intl/server";
import { MediaUpload } from "./_components/media-upload";
import { formatBytes, formatDate } from "@/lib/utils";
import { deleteMedia } from "../_actions/media";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  const t = await getTranslations("admin");
  const media = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
  }).catch(() => []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">{t("media")}</h1>
      <MediaUpload />

      {media.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
          {t("noResults")}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {media.map((m) => (
            <div
              key={m.id}
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-card"
            >
              <div className="relative aspect-square bg-muted">
                {m.mimeType.startsWith("image/") ? (
                  <Image
                    src={m.path}
                    alt={m.alt ?? m.originalName}
                    fill
                    sizes="(min-width: 1024px) 25vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                    {m.mimeType}
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="line-clamp-1 text-xs font-medium">
                  {m.originalName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatBytes(m.size)} · {formatDate(m.createdAt, "en")}
                </p>
              </div>
              <form
                action={async () => {
                  "use server";
                  await deleteMedia(m.id);
                }}
                className="absolute end-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Button
                  type="submit"
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8"
                  aria-label={t("delete")}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
