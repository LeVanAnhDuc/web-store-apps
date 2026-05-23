// libs
import { getTranslations } from "next-intl/server";
// components
import StatsRow from "./mains/StatsRow";
import LoginHistoryFilters from "./mains/LoginHistoryFilters";
import LoginHistoryTable from "./mains/LoginHistoryTable";

const LoginHistory = async () => {
  const t = await getTranslations("loginHistory");
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-foreground text-3xl font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>
      <StatsRow />
      <LoginHistoryFilters />
      <LoginHistoryTable />
    </div>
  );
};

export default LoginHistory;
