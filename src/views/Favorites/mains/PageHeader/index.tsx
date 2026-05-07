// libs
import { Bookmark } from "lucide-react";
import { getTranslations } from "next-intl/server";
// others
import { FAVORITE_APPS_MOCK } from "@/mocks/Favorites";

const PageHeader = async () => {
  const t = await getTranslations("favorites");
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-foreground text-3xl font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>
      <div className="flex items-center gap-1.5 rounded-full bg-indigo-50 px-4 py-2 text-indigo-600">
        <Bookmark className="size-3.5" aria-hidden="true" />
        <span className="text-xs font-semibold">
          {t("savedBadge", { count: FAVORITE_APPS_MOCK.length })}
        </span>
      </div>
    </div>
  );
};

export default PageHeader;
