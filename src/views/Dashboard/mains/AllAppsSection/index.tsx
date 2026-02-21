"use client";

// libs
import { Grid3X3, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
// types
import type { SortOption } from "@/dataSources/Dashboard";
// components
import AppCard from "../../components/AppCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
// dataSources
import { SORT_OPTIONS, getSortLabel } from "@/dataSources/Dashboard";
// mocks
import { APPS_DATA } from "@/mocks/Dashboard";
// others
import { parseDownloads } from "@/utils";

const AllAppsSection = () => {
  const t = useTranslations("dashboard.allApps");
  const tSort = useTranslations("dashboard.sort");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const sortedApps = [...APPS_DATA].sort((a, b) => {
    switch (sortBy) {
      case "featured":
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      case "rating":
        return b.rating - a.rating;
      case "downloads":
        return parseDownloads(b.downloads) - parseDownloads(a.downloads);
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Grid3X3 className="text-muted-foreground size-5" />
          <h2 className="text-foreground text-lg font-semibold">
            {t("title")}
          </h2>
          <span className="text-muted-foreground text-sm">
            ({APPS_DATA.length})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown className="text-muted-foreground size-4" />
          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value as SortOption)}
          >
            <SelectTrigger className="h-9 w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {getSortLabel(tSort, option.value)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedApps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </section>
  );
};

export default AllAppsSection;
