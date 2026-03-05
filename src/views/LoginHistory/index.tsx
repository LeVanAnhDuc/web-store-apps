// libs
import { getTranslations } from "next-intl/server";
// components
import LoginHistoryFilters from "./mains/LoginHistoryFilters";
import LoginHistoryTable from "./mains/LoginHistoryTable";

const LoginHistory = async () => {
  const t = await getTranslations("loginHistory");

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-foreground text-2xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground mt-1 text-sm">{t("description")}</p>
      </div>
      <LoginHistoryFilters />
      <LoginHistoryTable />
    </div>
  );
};

export default LoginHistory;
