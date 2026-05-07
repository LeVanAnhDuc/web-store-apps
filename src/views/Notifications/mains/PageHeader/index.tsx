"use client";

// libs
import { CheckCheck } from "lucide-react";
import { useTranslations } from "next-intl";
// components
import CustomButton from "@/components/CustomButton";
// hooks
import { useAnnounce } from "@/hooks";

const PageHeader = ({ onMarkAllRead }: { onMarkAllRead: () => void }) => {
  const t = useTranslations("notifications");
  const { announce } = useAnnounce();

  const handleMarkAllRead = () => {
    onMarkAllRead();
    announce(t("announce.markedAllRead"));
  };

  return (
    <div className="border-border bg-card flex flex-wrap items-center justify-between gap-3 border-b px-6 py-5">
      <div className="flex flex-col gap-1">
        <h1
          id="notifications-title"
          className="text-foreground text-xl font-bold tracking-tight"
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
      >
        {t("actions.markAllRead")}
      </CustomButton>
    </div>
  );
};

export default PageHeader;
