"use client";

// libs
import { useTranslations } from "next-intl";
// types
import type { EntitlementStatus } from "@/types/AdminEntitlements";
// components
import CustomBadge from "@/components/CustomBadge";
// others
import CONSTANTS from "@/constants";

const { GRANTED, NOT_GRANTED, INSUFFICIENT_ROLE } =
  CONSTANTS.ENTITLEMENT_STATUS;

const VARIANT_MAP: Record<
  EntitlementStatus,
  "success" | "secondary" | "warning"
> = {
  [GRANTED]: "success",
  [NOT_GRANTED]: "secondary",
  [INSUFFICIENT_ROLE]: "warning"
};

const KEY_MAP: Record<
  EntitlementStatus,
  "granted" | "notGranted" | "insufficientRole"
> = {
  [GRANTED]: "granted",
  [NOT_GRANTED]: "notGranted",
  [INSUFFICIENT_ROLE]: "insufficientRole"
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
