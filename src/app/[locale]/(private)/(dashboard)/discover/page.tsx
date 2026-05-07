// libs
import { getTranslations } from "next-intl/server";
// types
import type { Locale } from "@/i18n/config";
// components
import Discover from "@/views/Discover";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "discover" });
  return {
    title: t("title"),
    description: t("description")
  };
}

export default Discover;
