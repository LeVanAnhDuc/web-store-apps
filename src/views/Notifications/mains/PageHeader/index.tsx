"use client";

// libs
import { CheckCheck } from "lucide-react";
import { useTranslations } from "next-intl";
// components
import CustomButton from "@/components/CustomButton";
// hooks
import { useAnnounce } from "@/hooks";
import useMarkAllRead from "../../hooks/useMarkAllRead";

const PageHeader = () => {
  const t = useTranslations("notifications");
  const { announce } = useAnnounce();
  const markAll = useMarkAllRead();

  const handleMarkAllRead = () =>
    markAll.mutate(undefined, {
      onSuccess: () => announce(t("announce.markedAllRead"))
    });

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-col gap-1.5">
        <h1
          id="notifications-title"
          className="text-foreground text-3xl font-bold tracking-tight"
        >
          {t("title")}
        </h1>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>
      <CustomButton
        variant="outline"
        size="sm"
        iconLeft={<CheckCheck className="size-3.5" aria-hidden="true" />}
        onClick={handleMarkAllRead}
        disabled={markAll.isPending}
      >
        {t("actions.markAllRead")}
      </CustomButton>
    </div>
  );
};

export default PageHeader;
