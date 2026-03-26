// libs
import { getTranslations } from "next-intl/server";
// types
import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
// components
import ContactAdmin from "@/views/UserRaiseProblems/ContactAdmin";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactAdmin" });

  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const path = `${localePrefix}/contact-admin`;

  return {
    title: t("title"),
    description: t("form.title"),
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title: t("title"),
      description: t("form.title")
    },
    twitter: {
      card: "summary",
      title: t("title"),
      description: t("form.title")
    }
  };
}

export default ContactAdmin;
