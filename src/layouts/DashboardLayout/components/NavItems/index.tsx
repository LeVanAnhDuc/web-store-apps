// Tooltip (Radix UI) requires client-side JavaScript for hover/focus interactions
"use client";

// libs
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
// components
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
// dataSources
import { NAV_ITEMS } from "@/dataSources/Dashboard";
// others
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/libs/utils";

const NavItems = ({
  showExpandedContent
}: {
  showExpandedContent: boolean;
}) => {
  const t = useTranslations("dashboard.sidebar.nav");
  const pathname = usePathname();
  const [delayedExpanded, setDelayedExpanded] = useState(showExpandedContent);

  useEffect(() => {
    if (showExpandedContent) {
      setDelayedExpanded(true);
    } else {
      const timer = setTimeout(() => setDelayedExpanded(false), 300);
      return () => clearTimeout(timer);
    }
  }, [showExpandedContent]);

  return (
    <nav className="space-y-1">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <TooltipProvider
            key={`${item.key}-${showExpandedContent}`}
            delayDuration={0}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    !delayedExpanded && "justify-center px-2"
                  )}
                >
                  <Link href={item.href}>
                    <Icon className="size-4" />
                    {delayedExpanded && <span>{t(item.key)}</span>}
                  </Link>
                </Button>
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
