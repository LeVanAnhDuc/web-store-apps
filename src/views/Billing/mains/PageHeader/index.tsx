// libs
import { getTranslations } from "next-intl/server";

const PageHeader = async () => {
  const t = await getTranslations("billing");
  return (
    <div className="flex flex-col gap-1.5">
      <h1
        id="billing-page-title"
        className="text-foreground text-2xl font-bold tracking-tight"
      >
        {t("title")}
      </h1>
      <p className="text-muted-foreground text-sm">{t("description")}</p>
    </div>
  );
};

export default PageHeader;
