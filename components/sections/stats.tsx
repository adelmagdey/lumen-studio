"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef, useState, useEffect } from "react";

const items = [
  { value: 10, suffix: "+", key: "years" },
  { value: 200, suffix: "+", key: "projects" },
  { value: 150, suffix: "+", key: "clients" },
  { value: 99, suffix: "%", key: "satisfaction" },
] as const;

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1500;
    let raf: number;
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(to * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

export function Stats() {
  const t = useTranslations("stats");

  return (
    <section className="relative">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border/50 bg-card/30 p-6 backdrop-blur-md sm:grid-cols-4 sm:p-8">
          {items.map((item, i) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="text-3xl font-semibold tracking-tight sm:text-4xl">
                <CountUp to={item.value} suffix={item.suffix} />
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {t(item.key)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
