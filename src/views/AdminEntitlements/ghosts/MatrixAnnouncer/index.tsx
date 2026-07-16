"use client";

// libs
import { useTranslations } from "next-intl";
// hooks
import { useAnnounce, useUpdateEffect } from "@/hooks";

const MatrixAnnouncer = ({ isEditing }: { isEditing: boolean }) => {
  const t = useTranslations("adminEntitlements.announce");
  const { announce } = useAnnounce();

  useUpdateEffect(() => {
    if (isEditing) announce(t("editStart"));
  }, [isEditing]);

  return null;
};

export default MatrixAnnouncer;
