"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const tiers = ["starter", "pro", "enterprise"] as const;

export function Pricing() {
  const t = useTranslations("pricing");
  const [yearly, setYearly] = React.useState(false);

  return (
    <Section id="pricing" spacing="xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
          {t("title")}
        </h2>
        <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg">
          {t("subtitle")}
        </p>
      </motion.div>

      {/* Toggle */}
      <div className="mt-8 flex items-center justify-center">
        <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card/50 p-1 backdrop-blur-md">
          <button
            onClick={() => setYearly(false)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              !yearly
                ? "bg-foreground text-background shadow"
                : "text-muted-foreground"
            )}
          >
            {t("monthly")}
          </button>
          <button
            onClick={() => setYearly(true)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              yearly
                ? "bg-foreground text-background shadow"
                : "text-muted-foreground"
            )}
          >
            {t("yearly")}
            <span className="ms-2 text-xs text-[var(--color-brand-400)]">
              {t("saveUpTo")}
            </span>
          </button>
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {tiers.map((tier, i) => {
          const isPopular = tier === "pro";
          return (
            <motion.div
              key={tier}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card
                glass
                className={cn(
                  "relative h-full p-0",
                  isPopular && "ring-2 ring-[var(--color-brand-500)]/60"
                )}
              >
                {isPopular && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-gradient-to-r from-[var(--color-brand-500)] to-[var(--color-brand-700)] px-3 py-1 text-xs font-semibold text-white shadow-glow">
                    <Sparkles className="h-3 w-3" />
                    {t(`${tier}.popular`)}
                  </span>
                )}
                <CardContent className="flex h-full flex-col p-8">
                  <h3 className="text-lg font-semibold">{t(`${tier}.name`)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t(`${tier}.description`)}
                  </p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-semibold tracking-tight">
                      {yearly && tier !== "enterprise"
                        ? Math.round(
                            Number(
                              t(`${tier}.price`).replace(/[^\d]/g, "") || "0"
                            ) * 0.8
                          ).toLocaleString(localeString())
                        : t(`${tier}.price`)}
                    </span>
                    {tier !== "enterprise" && (
                      <span className="text-sm text-muted-foreground">
                        {yearly ? t("year") : t("month")}
                      </span>
                    )}
                  </div>
                  <ul className="mt-6 space-y-3 text-sm">
                    {(
                      t.raw(`${tier}.features`) as string[]
                    ).map((feature: string) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand-400)]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    variant={isPopular ? "gradient" : "glass"}
                    className="mt-8 w-full"
                  >
                    <Link href="/#contact">{t(`${tier}.cta`)}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

function localeString() {
  if (typeof navigator !== "undefined") return navigator.language;
  return "en-US";
}
