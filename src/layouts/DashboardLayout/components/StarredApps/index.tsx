"use client";

// libs
import { useState } from "react";
import { Star, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
// components
import CustomButton from "@/components/CustomButton";
// mocks
import { APPS_DATA } from "@/mocks/Dashboard";
// others
import { cn } from "@/libs/utils";

const StarredApps = () => {
  const t = useTranslations("dashboard.sidebar");
  const [isExpanded, setIsExpanded] = useState(true);

  const starredApps = APPS_DATA.filter((app) => app.featured).slice(0, 4);

  return (
    <div className="mt-6">
      <CustomButton
        variant="ghost"
        className="text-muted-foreground hover:text-foreground mb-2 w-full justify-between px-2 text-xs font-medium"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="flex items-center gap-2">
          <Star className="size-3" />
          {t("starredApps")}
        </span>
        <ChevronDown
          className={cn(
            "size-3 transition-transform",
            isExpanded && "rotate-180"
          )}
        />
      </CustomButton>

      {isExpanded && (
        <div className="space-y-1">
          {starredApps.map((app) => {
            const Icon = app.icon;
            return (
              <CustomButton
                key={app.id}
                variant="ghost"
                className="w-full justify-start gap-2 px-2"
              >
                <div
                  className={cn(
                    "flex size-6 items-center justify-center rounded",
                    `bg-gradient-to-br ${app.gradientClass}`
                  )}
                >
                  <Icon className="text-primary-foreground size-3" />
                </div>
                <span className="truncate text-sm">{app.name}</span>
              </CustomButton>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StarredApps;
