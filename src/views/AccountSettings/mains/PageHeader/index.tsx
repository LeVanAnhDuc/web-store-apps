// libs
import { ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

const PageHeader = async () => {
  const t = await getTranslations("accountSettings");
  return (
    <div className="flex flex-col gap-1.5">
      <nav
        aria-label={t("breadcrumb.settings")}
        className="text-muted-foreground flex items-center gap-1 text-xs"
      >
        <span>{t("breadcrumb.settings")}</span>
        <ChevronRight className="size-3" aria-hidden="true" />
        <span className="text-foreground font-medium">
          {t("breadcrumb.current")}
        </span>
      </nav>
      <h1
        id="account-settings-title"
        className="text-foreground text-2xl font-bold tracking-tight"
      >
        {t("title")}
      </h1>
      <p className="text-muted-foreground text-sm">{t("description")}</p>
    </div>
  );
};

export default PageHeader;
