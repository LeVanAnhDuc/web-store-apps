"use client";

// libs
import { ChevronLeft, ChevronRight, X } from "lucide-react";
// components
import CustomButton from "@/components/CustomButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavItems from "../../components/NavItems";
import StarredApps from "../../components/StarredApps";
import Categories from "../../components/Categories";
// others
import { cn } from "@/libs/utils";

const Sidebar = ({
  isCollapsed,
  onCollapsedChange,
  isMobileOpen,
  onMobileClose
}: {
  isCollapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}) => {
  const showExpandedContent = isMobileOpen || !isCollapsed;

  return (
    <>
      {isMobileOpen && (
        <div
          className="bg-background/80 fixed inset-0 z-40 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={cn(
          "bg-card border-border fixed top-0 left-0 z-50 h-screen border-r transition-all duration-300 lg:relative lg:z-40",
          isCollapsed ? "lg:w-16" : "lg:w-64",
          isMobileOpen
            ? "w-64 translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        )}
      >
        <CustomButton
          variant="outline"
          size="icon"
          className="bg-card hover:bg-accent absolute top-[69px] -right-3 z-10 hidden size-6 rounded-full shadow-md lg:flex"
          onClick={() => onCollapsedChange(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="size-3" />
          ) : (
            <ChevronLeft className="size-3" />
          )}
        </CustomButton>

        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-end px-4 lg:hidden">
            <CustomButton variant="ghost" size="icon" onClick={onMobileClose}>
              <X className="size-4" />
            </CustomButton>
          </div>

          <ScrollArea className="flex-1 px-3 py-4">
            <NavItems showExpandedContent={showExpandedContent} />

            {showExpandedContent && (
              <>
                <StarredApps />
                <Categories />
              </>
            )}
          </ScrollArea>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
