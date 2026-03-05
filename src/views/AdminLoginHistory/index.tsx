// libs
import { getTranslations } from "next-intl/server";
// components
import AdminLoginHistoryFilters from "./mains/AdminLoginHistoryFilters";
import AdminLoginHistoryTable from "./mains/AdminLoginHistoryTable";

const AdminLoginHistory = async () => {
  const t = await getTranslations("loginHistory.admin");

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-foreground text-2xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground mt-1 text-sm">{t("description")}</p>
      </div>
      <AdminLoginHistoryFilters />
      <AdminLoginHistoryTable />
    </div>
  );
};

export default AdminLoginHistory;
