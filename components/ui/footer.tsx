import { Github, Twitter, Linkedin, Instagram, Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

const socials = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
];

export async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");

  return (
    <footer className="relative mt-32 border-t border-border/50 glass-subtle">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 font-semibold tracking-tight">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-brand-400)] to-[var(--color-brand-700)] text-white shadow-glow">
                <Sparkles className="h-4 w-4" />
              </span>
              <span>{tCommon("brand")}</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {t("tagline")}
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Sitemap */}
          <div>
            <h3 className="text-sm font-semibold">{t("sitemap")}</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground">
                  {tNav("home")}
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-foreground">
                  {tNav("services")}
                </Link>
              </li>
              <li>
                <Link href="/#portfolio" className="hover:text-foreground">
                  {tNav("portfolio")}
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-foreground">
                  {tNav("pricing")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold">{t("resources")}</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Changelog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Roadmap
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Brand kit
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold">{t("newsletter.title")}</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              {t("newsletter.subtitle")}
            </p>
            <form className="mt-4 flex gap-2">
              <input
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="h-10 flex-1 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
              >
                {t("newsletter.subscribe")}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {tCommon("brand")}. {t("rights")}
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms
            </a>
            <LanguageSwitcher />
          </div>
        </div>
      </Container>
    </footer>
  );
}
