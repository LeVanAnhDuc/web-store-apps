"use client";

// libs
import { useTranslations } from "next-intl";
// hooks
import { useAnnounce, useUpdateEffect } from "@/hooks";

const PickerResultsAnnouncer = ({
  count,
  isOpen,
  query
}: {
  count: number;
  isOpen: boolean;
  query: string;
}) => {
  const t = useTranslations("adminEntitlements.announce");
  const { announce } = useAnnounce();

  useUpdateEffect(() => {
    if (isOpen && query) announce(t("results", { count }));
  }, [count, isOpen, query]);

  return null;
};

export default PickerResultsAnnouncer;
