"use client";

// libs
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
// components
import CustomButton from "@/components/CustomButton";

const AdminAppsHeader = ({ onCreate }: { onCreate: () => void }) => {
  const t = useTranslations("adminApps");
  const tActions = useTranslations("adminApps.actions");
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-foreground text-2xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground mt-1 text-sm">{t("description")}</p>
      </div>
      <CustomButton onClick={onCreate} iconLeft={<Plus aria-hidden="true" />}>
        {tActions("create")}
      </CustomButton>
    </div>
  );
};

export default AdminAppsHeader;
