"use client";

// libs
import { useState } from "react";
import { useTranslations } from "next-intl";
// types
import type { NotificationPrefKey } from "@/types/Profile";
// components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from "@/components/ui/card";
import CardSectionTitle from "@/components/CardSectionTitle";
import NotificationToggleRow from "../../components/NotificationToggleRow";
// hooks
import { useAnnounce } from "@/hooks";
// others
import { NOTIFICATION_PREFS_MOCK } from "@/mocks/Profile";

const NotificationPreferencesCard = () => {
  const t = useTranslations("profile.notificationPreferences");
  const { announce } = useAnnounce();
  const [statuses, setStatuses] = useState<
    Record<NotificationPrefKey, boolean>
  >(() =>
    NOTIFICATION_PREFS_MOCK.reduce(
      (acc, item) => {
        acc[item.key] = item.defaultEnabled;
        return acc;
      },
      {} as Record<NotificationPrefKey, boolean>
    )
  );

  const handleToggle = (key: NotificationPrefKey) => (next: boolean) => {
    setStatuses((prev) => ({ ...prev, [key]: next }));
    const name = t(`items.${key}.title`);
    announce(
      next ? t("announce.enabled", { name }) : t("announce.disabled", { name })
    );
  };

  return (
    <Card aria-labelledby="notification-prefs-title">
      <CardHeader className="border-b">
        <CardSectionTitle id="notification-prefs-title">
          {t("title")}
        </CardSectionTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        {NOTIFICATION_PREFS_MOCK.map((item) => (
          <NotificationToggleRow
            key={item.key}
            id={`notification-pref-${item.key}`}
            title={t(`items.${item.key}.title`)}
            description={t(`items.${item.key}.description`)}
            checked={statuses[item.key]}
            onCheckedChange={handleToggle(item.key)}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default NotificationPreferencesCard;
