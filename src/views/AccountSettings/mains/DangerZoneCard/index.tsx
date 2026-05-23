"use client";

// libs
import { useTranslations } from "next-intl";
// components
import CustomButton from "@/components/CustomButton";
import SharedDangerZoneCard from "@/components/DangerZoneCard";

const DangerZoneCard = () => {
  const t = useTranslations("accountSettings.dangerZone");

  return (
    <SharedDangerZoneCard
      titleId="account-danger-zone-title"
      title={t("title")}
      description={t("description")}
      items={[
        {
          title: t("deactivate.title"),
          description: t("deactivate.description"),
          action: (
            <CustomButton variant="destructive" size="sm">
              {t("deactivate.button")}
            </CustomButton>
          )
        }
      ]}
    />
  );
};

export default DangerZoneCard;
