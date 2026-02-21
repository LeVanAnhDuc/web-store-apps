"use client";

// libs
import { useState } from "react";
import { useTranslations } from "next-intl";
// components
import CustomButton from "@/components/CustomButton";
// dataSources
import {
  APP_CATEGORIES,
  CATEGORY_ICONS,
  getCategoryLabel
} from "@/dataSources/Dashboard";
// mocks
import { APPS_DATA } from "@/mocks/Dashboard";

const Categories = () => {
  const tSidebar = useTranslations("dashboard.sidebar");
  const tCategories = useTranslations("dashboard.categories");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const getCategoryCount = (category: string) =>
    APPS_DATA.filter((app) => app.category === category).length;

  return (
    <div className="mt-6">
      <p className="text-muted-foreground mb-2 px-2 text-xs font-medium">
        {tSidebar("categories")}
      </p>
      <div className="space-y-1">
        <CustomButton
          variant={selectedCategory === "all" ? "secondary" : "ghost"}
          className="w-full justify-between px-2"
          onClick={() => setSelectedCategory("all")}
        >
          <span>{tSidebar("allApps")}</span>
          <span className="text-muted-foreground text-xs">
            {APPS_DATA.length}
          </span>
        </CustomButton>

        {APP_CATEGORIES.map((category) => {
          const Icon = CATEGORY_ICONS[category];
          const count = getCategoryCount(category);
          return (
            <CustomButton
              key={category}
              variant={selectedCategory === category ? "secondary" : "ghost"}
              className="w-full justify-between px-2"
              onClick={() => setSelectedCategory(category)}
            >
              <span className="flex items-center gap-2">
                <Icon className="size-4" />
                {getCategoryLabel(tCategories, category)}
              </span>
              <span className="text-muted-foreground text-xs">{count}</span>
            </CustomButton>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
