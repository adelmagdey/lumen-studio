"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: { en: "Sara El-Sayed", ar: "سارة السيد" },
    role: { en: "Head of Design, Northwind", ar: "رئيسة التصميم، Northwind" },
    quote: {
      en: "Lumen shipped our new product page in two weeks. The 3D hero alone doubled our conversion rate.",
      ar: "فريق لومين أطلق صفحة المنتج الجديدة في أسبوعين. الـ Hero ثلاثي الأبعاد لوحده ضاعف معدل التحويل عندنا.",
    },
    initial: { en: "SE", ar: "س" },
  },
  {
    name: { en: "Marcus Chen", ar: "ماركوس تشين" },
    role: { en: "CTO, Aperture Labs", ar: "رئيس التقنية، Aperture Labs" },
    quote: {
      en: "Best Next.js team I've worked with. Their motion work is a different league.",
      ar: "أفضل فريق Next.js اشتغلت معاه. شغلهم في الحركة في مستوى تاني خالص.",
    },
    initial: { en: "MC", ar: "م" },
  },
  {
    name: { en: "Layla Khoury", ar: "ليلى الخوري" },
    role: { en: "Founder, Zestful", ar: "مؤسِسة، Zestful" },
    quote: {
      en: "They treat our brand like it's their own. The admin panel alone saved us a full hire.",
      ar: "بيعاملوا البراند بتاعنا كأنه بتاعهم. لوحة التحكم لوحدها وفّرت علينا توظيف كامل.",
    },
    initial: { en: "LK", ar: "ل" },
  },
  {
    name: { en: "Diego Alvarez", ar: "دييغو ألفاريز" },
    role: { en: "VP Product, Halcyon", ar: "نائب رئيس المنتج، Halcyon" },
    quote: {
      en: "From design system to launch in 5 weeks. The team moves fast and the work is exceptional.",
      ar: "من نظام التصميم للإطلاق في ٥ أسابيع. الفريق بيشتغل بسرعة والشغل استثنائي.",
    },
    initial: { en: "DA", ar: "د" },
  },
  {
    name: { en: "Yuki Tanaka", ar: "يوكي تاناكا" },
    role: { en: "Design Director, Mosaic", ar: "مدير التصميم، Mosaic" },
    quote: {
      en: "The only studio I'd trust with a brand-defining launch. Their taste is rare.",
      ar: "الستوديو الوحيد اللي أثق فيه في إطلاق بيعرّف البراند. ذوقهم نادر.",
    },
    initial: { en: "YT", ar: "ي" },
  },
];

export function Testimonials() {
  const t = useTranslations("testimonials");
  const locale = (typeof window !== "undefined" ? document.documentElement.lang : "en") as
    | "en"
    | "ar";
  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(1);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(id);
  }, [isPaused]);

  const next = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % testimonials.length);
  };
  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[index];

  return (
    <Section id="testimonials" spacing="xl">
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

      <div
        className="relative mt-12"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative mx-auto max-w-3xl">
          <Quote className="absolute -top-4 start-4 h-10 w-10 text-[var(--color-brand-400)]/30" />
          <Card glass className="p-0">
            <CardContent className="p-8 sm:p-12">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: direction * 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * 30 }}
                  transition={{ duration: 0.4 }}
                >
                  <blockquote className="text-lg leading-relaxed sm:text-xl">
                    &ldquo;{current.quote[locale]}&rdquo;
                  </blockquote>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-brand-400)] to-[var(--color-brand-700)] text-sm font-semibold text-white">
                      {current.initial[locale]}
                    </div>
                    <div>
                      <div className="font-semibold">
                        {current.name[locale]}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {current.role[locale]}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={prev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex gap-1.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index
                    ? "w-6 bg-foreground"
                    : "w-1.5 bg-muted-foreground/40"
                }`}
              />
            ))}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={next}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Section>
  );
}
