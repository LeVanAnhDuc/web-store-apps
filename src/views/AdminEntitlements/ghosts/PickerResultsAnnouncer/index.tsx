"use client";

// libs
import { useTranslations } from "next-intl";
// hooks
import { useAnnounce, useUpdateEffect } from "@/hooks";

const PickerResultsAnnouncer = ({
  count,
  isOpen
}: {
  count: number;
  isOpen: boolean;
}) => {
  const t = useTranslations("adminEntitlements.announce");
  const { announce } = useAnnounce();

  useUpdateEffect(() => {
    if (isOpen) announce(t("results", { count }));
  }, [count, isOpen]);

  return null;
};

export default PickerResultsAnnouncer;
