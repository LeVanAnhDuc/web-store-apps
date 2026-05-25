"use client";

// libs
import { useTranslations } from "next-intl";
// components
import CustomBadge from "@/components/CustomBadge";

const UserStatusBadge = ({ isActive }: { isActive: boolean }) => {
  const t = useTranslations("adminUsers.status");
  return (
    <CustomBadge
      variant={isActive ? "success" : "destructive"}
      className="text-xs"
    >
      {t(isActive ? "active" : "locked")}
    </CustomBadge>
  );
};

export default UserStatusBadge;
