"use client";

// libs
import { Check, X } from "lucide-react";
import { useTranslations } from "next-intl";
// types
import type { EntitlementStatus } from "@/types/AdminEntitlements";
// components
import CustomButton from "@/components/CustomButton";

const GrantToggleButton = ({
  status,
  onGrant,
  onRevokeRequest,
  isPending = false
}: {
  status: EntitlementStatus;
  onGrant: () => void;
  onRevokeRequest: () => void;
  isPending?: boolean;
}) => {
  const t = useTranslations("adminEntitlements.actions");

  if (status === "insufficient_role") {
    return (
      <CustomButton
        type="button"
        variant="outline"
        size="sm"
        disabled
        aria-label={t("blockedTooltip")}
        title={t("blockedTooltip")}
      >
        —
      </CustomButton>
    );
  }

  if (status === "granted") {
    return (
      <CustomButton
        type="button"
        variant="outline"
        size="sm"
        onClick={onRevokeRequest}
        loading={isPending}
        iconLeft={<X aria-hidden="true" />}
      >
        {isPending ? t("revoking") : t("revoke")}
      </CustomButton>
    );
  }

  return (
    <CustomButton
      type="button"
      variant="default"
      size="sm"
      onClick={onGrant}
      loading={isPending}
      iconLeft={<Check aria-hidden="true" />}
    >
      {isPending ? t("granting") : t("grant")}
    </CustomButton>
  );
};

export default GrantToggleButton;
