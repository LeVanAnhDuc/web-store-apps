"use client";

// libs
import { useState } from "react";
import { useTranslations } from "next-intl";
// components
import { Card } from "@/components/ui/card";
import ConnectedAccountRow from "../../components/ConnectedAccountRow";
// hooks
import { useAnnounce } from "@/hooks";
// others
import {
  CONNECTED_ACCOUNTS_MOCK,
  type ConnectedAccountKey
} from "@/mocks/Profile";

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
    <Card
      className="rounded-2xl border p-0"
      aria-labelledby="connected-accounts-title"
    >
      <div className="border-border flex flex-col gap-1 border-b px-6 py-5">
        <h2
          id="connected-accounts-title"
          className="text-foreground text-base font-semibold"
        >
          {t("title")}
        </h2>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>
      <div className="flex flex-col">
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
      </div>
    </Card>
  );
};

export default ConnectedAccountsCard;
