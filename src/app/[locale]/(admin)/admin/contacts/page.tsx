// libs
import { getTranslations } from "next-intl/server";
// types
import type { Locale } from "@/i18n/config";
// views
import AdminContacts from "@/views/AdminContacts";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "contactAdmin.admin.list"
  });

  return {
    title: t("title"),
    description: t("description")
  };
}

export default AdminContacts;
