"use client";

// libs
import { useState } from "react";
import { useTranslations } from "next-intl";
// components
import { Card } from "@/components/ui/card";
import NotificationToggleRow from "../../components/NotificationToggleRow";
// hooks
import { useAnnounce } from "@/hooks";
// others
import {
  NOTIFICATION_PREFS_MOCK,
  type NotificationPrefKey
} from "@/mocks/Profile";

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
    <Card
      className="rounded-2xl border p-0"
      aria-labelledby="notification-prefs-title"
    >
      <div className="border-border flex flex-col gap-1 border-b px-6 py-5">
        <h2
          id="notification-prefs-title"
          className="text-foreground text-base font-semibold"
        >
          {t("title")}
        </h2>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>
      <div className="flex flex-col">
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
      </div>
    </Card>
  );
};

export default NotificationPreferencesCard;
