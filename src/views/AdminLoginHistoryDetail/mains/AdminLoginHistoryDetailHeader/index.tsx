// libs
import { getTranslations } from "next-intl/server";
// components
import CustomBreadcrumb from "@/components/CustomBreadcrumb";
// dataSources
import { ADMIN_LOGIN_HISTORY_DETAIL_BREADCRUMB } from "@/dataSources/AdminLoginHistoryDetail";

const AdminLoginHistoryDetailHeader = async () => {
  const t = await getTranslations("loginHistory.admin.detail");
  return (
    <div className="flex flex-col gap-3">
      <CustomBreadcrumb
        items={ADMIN_LOGIN_HISTORY_DETAIL_BREADCRUMB}
        namespace="loginHistory.admin.detail.breadcrumb"
      />
      <h1 className="text-foreground text-2xl font-bold tracking-tight">
        {t("title")}
      </h1>
    </div>
  );
};

export default AdminLoginHistoryDetailHeader;
