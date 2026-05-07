// libs
import { Bookmark } from "lucide-react";
import { getTranslations } from "next-intl/server";
// components
import { Badge } from "@/components/ui/badge";
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
      <Badge
        variant="secondary"
        className="bg-primary/10 text-primary rounded-full border-0 px-4 py-2 text-xs font-semibold"
      >
        <Bookmark className="size-3.5" aria-hidden="true" />
        {t("savedBadge", { count: FAVORITE_APPS_MOCK.length })}
      </Badge>
    </div>
  );
};

export default PageHeader;
