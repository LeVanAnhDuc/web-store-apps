"use client";

// libs
import { Users } from "lucide-react";
import { useTranslations } from "next-intl";

const UsersEmptyState = () => {
  const t = useTranslations("adminUsers.table");
  return (
    <div className="flex flex-col items-center gap-2 py-16 text-center">
      <Users className="text-muted-foreground size-8" aria-hidden="true" />
      <p className="text-foreground text-sm font-medium">{t("empty")}</p>
      <p className="text-muted-foreground max-w-sm text-sm">
        {t("emptyDescription")}
      </p>
    </div>
  );
};

export default UsersEmptyState;
