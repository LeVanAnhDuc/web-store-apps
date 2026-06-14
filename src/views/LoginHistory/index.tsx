// libs
import { getTranslations } from "next-intl/server";
// components
import PageTitle from "@/components/PageTitle";
import StatsRow from "./mains/StatsRow";
import LoginHistoryFilters from "./mains/LoginHistoryFilters";
import LoginHistoryTable from "./mains/LoginHistoryTable";

const LoginHistory = async () => {
  const t = await getTranslations("loginHistory");
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <PageTitle>{t("title")}</PageTitle>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>
      <StatsRow />
      <LoginHistoryFilters />
      <LoginHistoryTable />
    </div>
  );
};

export default LoginHistory;
