"use client";

// libs
import { useTranslations } from "next-intl";
// components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from "@/components/ui/card";
import LoginActivityRow from "../../components/LoginActivityRow";
// others
import { LOGIN_ACTIVITY_MOCK } from "@/mocks/Security";

const LoginActivityCard = () => {
  const t = useTranslations("security.loginActivity");
  return (
    <Card aria-labelledby="login-activity-title">
      <CardHeader className="border-b">
        <h3
          id="login-activity-title"
          className="text-foreground text-base leading-none font-semibold"
        >
          {t("title")}
        </h3>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
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
      </CardContent>
    </Card>
  );
};

export default LoginActivityCard;
