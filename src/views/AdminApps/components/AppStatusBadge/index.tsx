"use client";

// libs
import { useTranslations } from "next-intl";
// types
import type { AppStatus } from "@/types/AdminApps";
// components
import CustomBadge from "@/components/CustomBadge";

const AppStatusBadge = ({ status }: { status: AppStatus }) => {
  const t = useTranslations("adminApps.status");
  return (
    <CustomBadge
      variant={status === "active" ? "success" : "secondary"}
      className="text-xs"
    >
      {t(status)}
    </CustomBadge>
  );
};

export default AppStatusBadge;
