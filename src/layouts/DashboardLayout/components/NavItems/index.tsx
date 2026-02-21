// Tooltip (Radix UI) requires client-side JavaScript for hover/focus interactions
"use client";

// libs
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
// components
import CustomButton from "@/components/CustomButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
// dataSources
import { NAV_ITEMS } from "@/dataSources/Dashboard";
// others
import { cn } from "@/libs/utils";

const SIDEBAR_TRANSITION_MS = 300;

const NavItems = ({
  showExpandedContent
}: {
  showExpandedContent: boolean;
}) => {
  const t = useTranslations("dashboard.sidebar.nav");
  const [delayedExpanded, setDelayedExpanded] = useState(showExpandedContent);

  useEffect(() => {
    if (showExpandedContent) {
      setDelayedExpanded(true);
    } else {
      const timer = setTimeout(
        () => setDelayedExpanded(false),
        SIDEBAR_TRANSITION_MS
      );
      return () => clearTimeout(timer);
    }
  }, [showExpandedContent]);

  return (
    <nav className="space-y-1">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <TooltipProvider
            key={`${item.key}-${showExpandedContent}`}
            delayDuration={0}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <CustomButton
                  variant={item.key === "home" ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    !delayedExpanded && "justify-center px-2"
                  )}
                >
                  <Icon className="size-4" />
                  {delayedExpanded && <span>{t(item.key)}</span>}
                </CustomButton>
              </TooltipTrigger>
              {!showExpandedContent && (
                <TooltipContent side="right">
                  <p>{t(item.key)}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </nav>
  );
};

export default NavItems;
