"use client";

// libs
import { Circle, CircleCheck, CircleMinus, Lock } from "lucide-react";
import { useTranslations } from "next-intl";
// types
import type { BulkEntitlementRow } from "@/types/AdminEntitlements";
// others
import CONSTANTS from "@/constants";

const { GRANTED, PARTIAL, INSUFFICIENT_ROLE } = CONSTANTS.ENTITLEMENT_STATUS;

const AppAccessStatus = ({ row }: { row: BulkEntitlementRow }) => {
  const t = useTranslations("adminEntitlements.status");

  if (row.status === INSUFFICIENT_ROLE) {
    return (
      <span className="text-muted-foreground inline-flex items-center gap-1 text-xs font-medium">
        <Lock className="size-3.5" aria-hidden="true" />
        {t("roleRequired")}
      </span>
    );
  }

  if (row.status === GRANTED) {
    return (
      <span className="text-success inline-flex items-center gap-1 text-xs font-medium">
        <CircleCheck className="size-3.5" aria-hidden="true" />
        {t("allGranted")}
      </span>
    );
  }

  if (row.status === PARTIAL) {
    return (
      <span className="text-warning inline-flex items-center gap-1 text-xs font-medium">
        <CircleMinus className="size-3.5" aria-hidden="true" />
        {t("partial", { granted: row.grantedCount, total: row.totalCount })}
      </span>
    );
  }

  return (
    <span className="text-muted-foreground inline-flex items-center gap-1 text-xs font-medium">
      <Circle className="size-3.5" aria-hidden="true" />
      {t("notGranted")}
    </span>
  );
};

export default AppAccessStatus;
