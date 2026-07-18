"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Image as ImageIcon,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
  Bell,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { UserRole } from "@/lib/types";

type NavItem = {
  href: string;
  key:
    | "dashboard"
    | "articles"
    | "projects"
    | "media"
    | "users"
    | "messages"
    | "settings";
  icon: React.ElementType;
  adminOnly?: boolean;
};

const navItems: NavItem[] = [
  { href: "/admin", key: "dashboard", icon: LayoutDashboard },
  { href: "/admin/articles", key: "articles", icon: FileText },
  { href: "/admin/projects", key: "projects", icon: Briefcase },
  { href: "/admin/media", key: "media", icon: ImageIcon },
  { href: "/admin/users", key: "users", icon: Users, adminOnly: true },
  { href: "/admin/messages", key: "messages", icon: MessageSquare },
  { href: "/admin/settings", key: "settings", icon: Settings },
];

interface AdminShellProps {
  children: React.ReactNode;
  user: { name: string; email: string; role: UserRole };
  onSignOut: () => Promise<void>;
}

export function AdminShell({ children, user, onSignOut }: AdminShellProps) {
  const t = useTranslations("admin");
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const items = navItems.filter(
    (item) => !item.adminOnly || user.role === "ADMIN"
  );

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border/50 bg-background/80 px-4 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-brand-400)] to-[var(--color-brand-700)] text-white">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="font-semibold">{tCommon("brand")}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 start-0 z-50 w-64 transform border-e border-border/50 bg-background transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full rtl:translate-x-full"
          )}
        >
          <div className="flex h-full flex-col">
            <div className="hidden h-16 items-center gap-2 border-b border-border/50 px-6 lg:flex">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-brand-400)] to-[var(--color-brand-700)] text-white shadow-glow">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="font-semibold">{tCommon("brand")}</span>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto p-4">
              {items.map((item) => {
                const Icon = item.icon;
                const href = `/${locale}${item.href}`;
                const isActive =
                  item.href === "/admin"
                    ? pathname === href
                    : pathname.startsWith(href);
                return (
                  <Link
                    key={item.key}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {t(item.key)}
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-border/50 p-4">
              <div className="flex items-center gap-3 rounded-md p-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-brand-400)] to-[var(--color-brand-700)] text-xs font-semibold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{user.name}</div>
                  <div className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </div>
                </div>
                <form action={onSignOut}>
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    aria-label={tNav("home")}
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 lg:ms-64">
          {/* Top bar */}
          <div className="sticky top-0 z-30 hidden h-16 items-center justify-between border-b border-border/50 bg-background/80 px-6 backdrop-blur-md lg:flex">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                {tCommon("brand")}
              </Link>
              <span>/</span>
              <span className="text-foreground">Admin</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" aria-label="Search">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Backdrop for mobile */}
          {open && (
            <div
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setOpen(false)}
            />
          )}

          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
