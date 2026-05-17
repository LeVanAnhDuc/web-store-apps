"use client";

// libs
import type { LucideIcon } from "lucide-react";
// components
import { Button } from "@/components/ui/button";
import CustomTooltip from "@/components/CustomTooltip";
// hooks
import { useDelayedFlag } from "@/hooks";
// others
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/libs/utils";
import { useEffectiveCollapsed } from "../../context";

const NavItem = ({
  icon: Icon,
  label,
  href
}: {
  icon: LucideIcon;
  label: string;
  href: string;
}) => {
  const collapsed = useEffectiveCollapsed();
  const pathname = usePathname();
  const isActive = pathname === href;
  const showLabel = useDelayedFlag(!collapsed);
  return (
    <CustomTooltip
      asChild
      content={collapsed ? label : null}
      side="right"
      delayDuration={0}
    >
      <Button
        asChild
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start gap-3",
          collapsed && "justify-center px-2"
        )}
      >
        <Link href={href} aria-current={isActive ? "page" : undefined}>
          <Icon className="size-4 shrink-0" aria-hidden="true" />
          {showLabel && <span className="truncate">{label}</span>}
        </Link>
      </Button>
    </CustomTooltip>
  );
};

export default NavItem;
