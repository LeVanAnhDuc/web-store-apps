// libs
import { getTranslations } from "next-intl/server";
// components
import PageTitle from "@/components/PageTitle";

const AdminLoginHistoryHeader = async () => {
  const t = await getTranslations("loginHistory.admin");
  return (
    <div className="flex flex-col gap-1.5">
      <PageTitle>{t("title")}</PageTitle>
      <p className="text-muted-foreground text-sm">{t("description")}</p>
    </div>
  );
};

export default AdminLoginHistoryHeader;
