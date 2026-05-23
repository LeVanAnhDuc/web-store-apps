"use client";

// libs
import { useState } from "react";
import { useTranslations } from "next-intl";
// components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from "@/components/ui/card";
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
    <Card aria-labelledby="two-factor-title">
      <CardHeader className="border-b">
        <h3
          id="two-factor-title"
          className="text-foreground text-base leading-none font-semibold"
        >
          {t("title")}
        </h3>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-foreground text-sm font-medium">
              {t("subtitle", { state: stateLabel })}
            </p>
            <p className="text-muted-foreground mt-0.5 text-sm">{t("hint")}</p>
          </div>
          <Switch
            checked={enabled}
            onCheckedChange={handleToggle}
            aria-label={t("toggleLabel")}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TwoFactorCard;
