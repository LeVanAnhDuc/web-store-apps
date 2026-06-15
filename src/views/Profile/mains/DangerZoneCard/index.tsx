"use client";

// libs
import { useTranslations } from "next-intl";
// components
import CustomButton from "@/components/CustomButton";
import SharedDangerZoneCard from "@/components/DangerZoneCard";

const DangerZoneCard = () => {
  const t = useTranslations("profile.dangerZone");

  return (
    <SharedDangerZoneCard
      titleId="danger-zone-title"
      title={t("title")}
      description={t("description")}
      items={[
        {
          title: t("delete.title"),
          description: t("delete.description"),
          action: (
            <CustomButton variant="destructive">
              {t("delete.button")}
            </CustomButton>
          )
        }
      ]}
    />
  );
};

export default DangerZoneCard;
