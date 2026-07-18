"use client";

import * as React from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/#services", key: "services" },
  { href: "/#portfolio", key: "portfolio" },
  { href: "/#pricing", key: "pricing" },
  { href: "/#testimonials", key: "testimonials" },
  { href: "/#contact", key: "contact" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2 font-semibold tracking-tight"
        >
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-brand-400)] to-[var(--color-brand-700)] text-white shadow-glow">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="text-base">{tCommon("brand")}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href.replace(/^\//, `/${locale}`)}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <LanguageSwitcher />
          <Button
            asChild
            variant="gradient"
            size="sm"
            className="hidden md:inline-flex"
          >
            <Link href="/#contact">{tCommon("contactUs")}</Link>
          </Button>
          <button
            onClick={() => setOpen(!open)}
            className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground md:hidden"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-x-0 top-16 z-40 h-[calc(100vh-4rem)] overflow-y-auto bg-background/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-2 p-4">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href.replace(/^\//, `/${locale}`)}
                className="rounded-md px-4 py-3 text-base font-medium text-foreground hover:bg-accent"
                onClick={() => setOpen(false)}
              >
                {t(item.key)}
              </a>
            ))}
            <Button asChild variant="gradient" className="mt-2 w-full">
              <Link href="/#contact">{tCommon("contactUs")}</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
