"use client";

// libs
import { useState } from "react";
import { useTranslations } from "next-intl";
// components
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
// hooks
import { useAnnounce } from "@/hooks";

const TwoFactorCard = () => {
  const t = useTranslations("accountSettings.twoFactor");
  const { announce } = useAnnounce();
  const [enabled, setEnabled] = useState(true);

  const handleToggle = (next: boolean) => {
    setEnabled(next);
    announce(next ? t("announce.enabled") : t("announce.disabled"));
  };

  const stateLabel = enabled ? t("stateOn") : t("stateOff");

  return (
    <Card className="rounded-2xl border p-0" aria-labelledby="two-factor-title">
      <div className="border-border flex flex-col gap-1 border-b px-6 py-5">
        <h2
          id="two-factor-title"
          className="text-foreground text-base font-semibold"
        >
          {t("title")}
        </h2>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>
      <div className="flex flex-col gap-3 px-6 py-5">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-foreground text-sm font-medium">
              {t("subtitle", { state: stateLabel })}
            </p>
            <p className="text-muted-foreground mt-0.5 text-xs">{t("hint")}</p>
          </div>
          <Switch
            checked={enabled}
            onCheckedChange={handleToggle}
            aria-label={t("toggleLabel")}
          />
        </div>
      </div>
    </Card>
  );
};

export default TwoFactorCard;
