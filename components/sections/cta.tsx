"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export function Cta() {
  const t = useTranslations("cta");

  return (
    <Section spacing="xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-border/50 p-8 text-center shadow-elevated sm:p-16"
      >
        {/* Background */}
        <div
          className="absolute inset-0 -z-10 gradient-mesh opacity-30"
          aria-hidden
        />
        <div
          className="absolute inset-0 -z-10 grid-bg opacity-30"
          aria-hidden
        />

        <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
          {t("subtitle")}
        </p>
        <div className="mt-8 flex justify-center">
          <Button asChild variant="gradient" size="lg" className="group">
            <Link href="/#contact">
              {t("button")}
              <ArrowRight className="transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </Section>
  );
}
