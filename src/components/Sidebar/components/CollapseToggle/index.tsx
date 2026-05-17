"use client";

// libs
import { ChevronLeft, ChevronRight } from "lucide-react";
// components
import CustomButton from "@/components/CustomButton";
// others
import { cn } from "@/libs/utils";
import { useSidebarContext } from "../../context";

const CollapseToggle = ({
  "aria-label": ariaLabel,
  className
}: {
  "aria-label": string;
  className?: string;
}) => {
  const { isCollapsed, onCollapsedChange } = useSidebarContext();
  return (
    <CustomButton
      variant="outline"
      size="icon"
      aria-label={ariaLabel}
      className={cn(
        "bg-card hover:bg-accent absolute top-[69px] -right-3 z-10 hidden size-6 rounded-full shadow-md lg:flex",
        className
      )}
      onClick={() => onCollapsedChange(!isCollapsed)}
    >
      {isCollapsed ? (
        <ChevronRight className="size-3" aria-hidden="true" />
      ) : (
        <ChevronLeft className="size-3" aria-hidden="true" />
      )}
    </CustomButton>
  );
};

export default CollapseToggle;
