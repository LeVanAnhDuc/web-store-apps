// libs
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
// types
import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
// components
import { Toaster } from "@/components/ui/sonner";
// contexts
import AppProvider from "@/contexts/AppProvider";
// others
import { routing } from "@/i18n/routing";
import "./globals.css";

export const generateStaticParams = () =>
  routing.locales.map((locale) => ({ locale }));

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  return {
    title: t("app.name"),
    description: t("app.description")
  };
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <a
          href="#main-content"
          className="focus:bg-background focus:text-foreground sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:rounded focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-md"
        >
          {t("skipToContent")}
        </a>
        <div
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
          id="announcer"
        />
        <AppProvider>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
