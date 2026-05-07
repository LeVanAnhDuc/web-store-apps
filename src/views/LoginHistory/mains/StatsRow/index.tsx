// libs
import { Activity, CircleCheck, CircleX, Monitor } from "lucide-react";
import { getTranslations } from "next-intl/server";
// components
import LoginStatCard from "../../components/LoginStatCard";

const StatsRow = async () => {
  const t = await getTranslations("loginHistory.stats");
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <LoginStatCard
        icon={Activity}
        label={t("totalLogins")}
        value={156}
        tone="neutral"
      />
      <LoginStatCard
        icon={CircleCheck}
        label={t("successful")}
        value={142}
        tone="success"
      />
      <LoginStatCard
        icon={CircleX}
        label={t("failed")}
        value={14}
        tone="danger"
      />
      <LoginStatCard
        icon={Monitor}
        label={t("activeSessions")}
        value={3}
        tone="info"
      />
    </div>
  );
};

export default StatsRow;
