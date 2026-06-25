"use client";

// libs
import { useState } from "react";
import { useTranslations } from "next-intl";
// types
import type { ConnectedAccountKey } from "@/types/Profile";
// components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from "@/components/ui/card";
import CardSectionTitle from "@/components/CardSectionTitle";
import ConnectedAccountRow from "../../components/ConnectedAccountRow";
// hooks
import { useAnnounce } from "@/hooks";
// others
import { CONNECTED_ACCOUNTS_MOCK } from "@/mocks/Profile";

const ConnectedAccountsCard = () => {
  const t = useTranslations("profile.connectedAccounts");
  const { announce } = useAnnounce();
  const [statuses, setStatuses] = useState<
    Record<ConnectedAccountKey, boolean>
  >(() =>
    CONNECTED_ACCOUNTS_MOCK.reduce(
      (acc, item) => {
        acc[item.key] = item.isConnected;
        return acc;
      },
      {} as Record<ConnectedAccountKey, boolean>
    )
  );

  const handleToggle = (key: ConnectedAccountKey) => {
    setStatuses((prev) => {
      const next = !prev[key];
      announce(next ? t("announce.connected") : t("announce.disconnected"));
      return { ...prev, [key]: next };
    });
  };

  return (
    <Card aria-labelledby="connected-accounts-title">
      <CardHeader className="border-b">
        <CardSectionTitle id="connected-accounts-title">
          {t("title")}
        </CardSectionTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        {CONNECTED_ACCOUNTS_MOCK.map((item) => (
          <ConnectedAccountRow
            key={item.key}
            icon={item.icon}
            name={t(`providers.${item.key}.name`)}
            email={t(`providers.${item.key}.email`)}
            isConnected={statuses[item.key]}
            connectedLabel={t("connected")}
            connectLabel={t("buttons.connect")}
            disconnectLabel={t("buttons.disconnect")}
            onToggle={() => handleToggle(item.key)}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default ConnectedAccountsCard;
