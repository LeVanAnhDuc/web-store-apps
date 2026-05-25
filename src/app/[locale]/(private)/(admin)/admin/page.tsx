// libs
import { getTranslations } from "next-intl/server";
// types
import type { Locale } from "@/i18n/config";
// views
import AdminDashboard from "@/views/AdminDashboard";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminDashboard" });
  return {
    title: t("title"),
    description: t("description")
  };
}

export default AdminDashboard;
