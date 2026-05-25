"use client";

// libs
import { useTranslations } from "next-intl";
// types
import type { EntitlementStatus } from "@/types/AdminEntitlements";
// components
import CustomBadge from "@/components/CustomBadge";

const VARIANT_MAP: Record<
  EntitlementStatus,
  "success" | "secondary" | "warning"
> = {
  granted: "success",
  not_granted: "secondary",
  insufficient_role: "warning"
};

const KEY_MAP: Record<
  EntitlementStatus,
  "granted" | "notGranted" | "insufficientRole"
> = {
  granted: "granted",
  not_granted: "notGranted",
  insufficient_role: "insufficientRole"
};

const EntitlementStatusBadge = ({ status }: { status: EntitlementStatus }) => {
  const t = useTranslations("adminEntitlements.status");
  return (
    <CustomBadge variant={VARIANT_MAP[status]} className="text-xs">
      {t(KEY_MAP[status])}
    </CustomBadge>
  );
};

export default EntitlementStatusBadge;
