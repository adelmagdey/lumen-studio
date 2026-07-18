"use client";

import { motion } from "framer-motion";
import {
  Palette,
  Code2,
  Boxes,
  Sparkles,
  Brain,
  LineChart,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const iconMap: Record<string, LucideIcon> = {
  product: Palette,
  web: Code2,
  threeD: Boxes,
  motion: Sparkles,
  ai: Brain,
  growth: LineChart,
};

const keys = ["product", "web", "threeD", "motion", "ai", "growth"] as const;

export function Services() {
  const t = useTranslations("services");

  return (
    <Section id="services" spacing="xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
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

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {keys.map((key, i) => {
          const Icon = iconMap[key];
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Card
                glass
                className="group h-full transition-all hover:-translate-y-1 hover:shadow-elevated"
              >
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-brand-500)]/20 to-[var(--color-brand-700)]/20 text-[var(--color-brand-400)] transition-transform group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">
                    {t(`items.${key}.title`)}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {t(`items.${key}.description`)}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
