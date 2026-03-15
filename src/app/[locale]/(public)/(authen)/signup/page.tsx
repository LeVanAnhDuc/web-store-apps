// libs
import { redirect } from "next/navigation";
// types
import type { Locale } from "@/i18n/config";

export default async function SignupPage({
  params
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/login`);
}
