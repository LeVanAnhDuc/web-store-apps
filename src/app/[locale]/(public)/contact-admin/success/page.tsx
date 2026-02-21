// libs
import { getTranslations } from "next-intl/server";
// types
import type { Locale } from "@/i18n/config";
// components
import ContactAdminSuccess from "@/views/ContactAdminSuccess";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactAdmin" });

  return {
    title: t("success.title")
  };
}

export default ContactAdminSuccess;
