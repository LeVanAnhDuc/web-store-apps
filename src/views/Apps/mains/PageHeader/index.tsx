// libs
import { getTranslations } from "next-intl/server";

const PageHeader = async () => {
  const t = await getTranslations("apps");
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-foreground text-3xl font-bold tracking-tight">
        {t("title")}
      </h1>
      <p className="text-muted-foreground text-sm">{t("description")}</p>
    </div>
  );
};

export default PageHeader;
