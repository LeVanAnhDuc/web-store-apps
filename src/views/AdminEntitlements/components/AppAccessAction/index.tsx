"use client";

// libs
import { Check, X } from "lucide-react";
import { useTranslations } from "next-intl";
// types
import type { EntitlementStatus } from "@/types/AdminEntitlements";
// components
import CustomButton from "@/components/CustomButton";
// others
import CONSTANTS from "@/constants";

const { GRANTED, INSUFFICIENT_ROLE } = CONSTANTS.ENTITLEMENT_STATUS;

const AppAccessAction = ({
  status,
  isPending = false,
  onGrant,
  onRevokeRequest
}: {
  status: EntitlementStatus;
  isPending?: boolean;
  onGrant: () => void;
  onRevokeRequest: () => void;
}) => {
  const t = useTranslations("adminEntitlements.actions");

  if (status === INSUFFICIENT_ROLE) {
    return (
      <CustomButton
        type="button"
        variant="default"
        size="sm"
        disabled
        title={t("roleRequiredTooltip")}
        iconLeft={<Check aria-hidden="true" />}
      >
        {t("grantAll")}
      </CustomButton>
    );
  }

  if (status === GRANTED) {
    return (
      <CustomButton
        type="button"
        variant="outline"
        size="sm"
        loading={isPending}
        onClick={onRevokeRequest}
        iconLeft={<X aria-hidden="true" />}
      >
        {t("revokeAll")}
      </CustomButton>
    );
  }

  return (
    <CustomButton
      type="button"
      variant="default"
      size="sm"
      loading={isPending}
      onClick={onGrant}
      iconLeft={<Check aria-hidden="true" />}
    >
      {t("grantAll")}
    </CustomButton>
  );
};

export default AppAccessAction;
