// libs
import { getTranslations } from "next-intl/server";
// types
import type { Locale } from "@/i18n/config";
// views
import AdminLoginHistory from "@/views/AdminLoginHistory";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "loginHistory.admin" });

  return {
    title: t("title"),
    description: t("description")
  };
}

export default AdminLoginHistory;
