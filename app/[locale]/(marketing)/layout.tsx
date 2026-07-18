import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/request";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function MarketingLayout({
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
      <div className="relative flex min-h-screen flex-col">
        <Navbar />
        <main id="main" className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
