"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

const HeroScene = dynamic(
  () => import("@/components/three/hero-scene").then((m) => m.HeroScene),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-12 w-12 animate-pulse rounded-full bg-primary/20 blur-2xl" />
      </div>
    ),
  }
);

const stats = [
  { value: "10+", key: "stat1" },
  { value: "200+", key: "stat2" },
  { value: "150+", key: "stat3" },
  { value: "99%", key: "stat4" },
] as const;

export function Hero() {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* 3D background */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <HeroScene />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
        <div
          className="pointer-events-none absolute inset-0 grid-bg opacity-40"
          aria-hidden
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-32 sm:px-6 sm:py-40 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/40 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-md">
              <Sparkles className="h-3 w-3 text-[var(--color-brand-400)]" />
              {t("eyebrow")}
            </span>
          </motion.div>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className="block text-gradient">{t("title")}</span>
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            className="mx-auto mt-6 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button asChild variant="gradient" size="lg" className="group">
              <Link href="/#contact">
                {tCommon("getStarted")}
                <ArrowRight className="transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg">
              <Link href="/#portfolio">{tCommon("viewWork")}</Link>
            </Button>
          </motion.div>

          <motion.dl
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.key} className="flex flex-col items-center text-center">
                <dt className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  {t(s.key)}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <a
          href="#services"
          className="absolute inset-x-0 bottom-8 mx-auto flex w-fit flex-col items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          aria-label={t("scroll")}
        >
          <span>{t("scroll")}</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
