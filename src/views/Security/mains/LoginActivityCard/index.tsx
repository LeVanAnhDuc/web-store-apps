"use client";

// libs
import { useTranslations } from "next-intl";
// components
import { Card } from "@/components/ui/card";
import LoginActivityRow from "../../components/LoginActivityRow";
// others
import { LOGIN_ACTIVITY_MOCK } from "@/mocks/Security";

const LoginActivityCard = () => {
  const t = useTranslations("security.loginActivity");
  return (
    <Card
      className="rounded-2xl border p-0"
      aria-labelledby="login-activity-title"
    >
      <div className="border-border flex flex-col gap-1 border-b px-6 py-5">
        <h2
          id="login-activity-title"
          className="text-foreground text-base font-semibold"
        >
          {t("title")}
        </h2>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>
      <div className="flex flex-col">
        {LOGIN_ACTIVITY_MOCK.map((item) => (
          <LoginActivityRow
            key={item.id}
            icon={item.icon}
            title={item.title}
            meta={item.meta}
            timestamp={item.timestamp}
            status={item.status}
          />
        ))}
      </div>
    </Card>
  );
};

export default LoginActivityCard;
