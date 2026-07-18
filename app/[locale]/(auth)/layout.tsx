import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/request";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
        {/* Decorative background */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 gradient-mesh opacity-20"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 -z-10 grid-bg"
          aria-hidden
        />
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
