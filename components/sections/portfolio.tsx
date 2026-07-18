"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, Filter } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Project = {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  image: string | null;
  category: string | null;
  technologies: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
};

export function Portfolio({ projects }: { projects: Project[] }) {
  const t = useTranslations("portfolio");
  const tCommon = useTranslations("common");
  const locale = useLocaleFromContext();
  const [filter, setFilter] = React.useState<string>("all");
  const [active, setActive] = React.useState<Project | null>(null);

  const filters = [
    { key: "all", label: t("filterAll") },
    { key: "web", label: t("filterWeb") },
    { key: "mobile", label: t("filterMobile") },
    { key: "design", label: t("filterDesign") },
    { key: "threeD", label: t("filterThreeD") },
  ];

  const filtered = React.useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) =>
      (p.category ?? "").toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter, projects]);

  return (
    <Section id="portfolio" spacing="xl">
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

      {/* Filter tabs */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
        <Filter className="hidden h-4 w-4 text-muted-foreground sm:block" />
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
              filter === f.key
                ? "border-transparent bg-foreground text-background shadow-glow"
                : "border-border bg-card/40 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => {
            const title = locale === "ar" ? project.titleAr : project.titleEn;
            const description =
              locale === "ar" ? project.descriptionAr : project.descriptionEn;
            return (
              <motion.button
                layout
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setActive(project)}
                className="group text-left"
              >
                <Card className="overflow-hidden p-0 transition-all group-hover:-translate-y-1 group-hover:shadow-elevated">
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 gradient-mesh opacity-60" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    {project.category && (
                      <span className="absolute start-3 top-3 rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-md">
                        {project.category}
                      </span>
                    )}
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                      <h3 className="text-lg font-semibold">{title}</h3>
                      <p className="line-clamp-1 text-sm text-white/80">
                        {description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong relative w-full max-w-2xl overflow-hidden rounded-2xl shadow-elevated"
            >
              {active.image && (
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={active.image}
                    alt={locale === "ar" ? active.titleAr : active.titleEn}
                    fill
                    sizes="(min-width: 768px) 600px, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
              <button
                onClick={() => setActive(null)}
                className="absolute end-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60"
                aria-label={t("close")}
              >
                <X className="h-4 w-4" />
              </button>
              <div className="p-6">
                <h3 className="text-2xl font-semibold">
                  {locale === "ar" ? active.titleAr : active.titleEn}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {locale === "ar" ? active.descriptionAr : active.descriptionEn}
                </p>
                {active.technologies && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {active.technologies
                      .split(",")
                      .map((tech) => tech.trim())
                      .filter(Boolean)
                      .map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-border bg-muted/50 px-3 py-0.5 text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                  </div>
                )}
                <div className="mt-6 flex flex-wrap gap-2">
                  {active.liveUrl && (
                    <Button asChild variant="gradient" size="sm">
                      <a
                        href={active.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                        {t("viewLive")}
                      </a>
                    </Button>
                  )}
                  {active.githubUrl && (
                    <Button asChild variant="glass" size="sm">
                      <a
                        href={active.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Github className="h-4 w-4" />
                        {t("viewCode")}
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-muted-foreground">
          {tCommon("error")}
        </p>
      )}
    </Section>
  );
}

// inline import to avoid unused var warning
import { useLocale as useLocaleFromContext } from "next-intl";
