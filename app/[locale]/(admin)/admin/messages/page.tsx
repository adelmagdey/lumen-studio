import { prisma } from "@/lib/db";
import { getTranslations } from "next-intl/server";
import { formatDate } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Trash2, Check } from "lucide-react";
import { markRead, deleteMessage } from "../_actions/messages";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const t = await getTranslations("admin");
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  }).catch(() => []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">
        {t("messages")}
      </h1>

      {messages.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">{t("noResults")}</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <Card
              key={m.id}
              className={`p-0 transition-colors ${
                m.read ? "opacity-60" : ""
              }`}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{m.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {m.email}
                      </span>
                      {!m.read && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          {t("unread")}
                        </span>
                      )}
                    </div>
                    {m.subject && (
                      <p className="mt-1 text-sm font-medium">{m.subject}</p>
                    )}
                    <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">
                      {m.message}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {formatDate(m.createdAt, "en")}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    {!m.read && (
                      <form
                        action={async () => {
                          "use server";
                          await markRead(m.id, true);
                        }}
                      >
                        <Button
                          type="submit"
                          variant="ghost"
                          size="icon"
                          aria-label={t("markRead")}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      </form>
                    )}
                    <form
                      action={async () => {
                        "use server";
                        await deleteMessage(m.id);
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
