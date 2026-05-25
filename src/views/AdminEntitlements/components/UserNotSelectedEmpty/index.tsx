"use client";

// libs
import { Users } from "lucide-react";
import { useTranslations } from "next-intl";

const UserNotSelectedEmpty = () => {
  const t = useTranslations("adminEntitlements.emptyUser");
  return (
    <div className="bg-card flex flex-col items-center gap-2 rounded-xl border py-16 text-center">
      <Users className="text-muted-foreground size-8" aria-hidden="true" />
      <p className="text-foreground text-sm font-medium">{t("title")}</p>
      <p className="text-muted-foreground max-w-sm text-sm">
        {t("description")}
      </p>
    </div>
  );
};

export default UserNotSelectedEmpty;
