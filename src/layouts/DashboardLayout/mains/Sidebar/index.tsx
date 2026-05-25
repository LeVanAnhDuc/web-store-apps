"use client";

// libs
import { useTranslations } from "next-intl";
// components
import { CustomSidebarCollapseToggle } from "@/components/CustomSidebar";
import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import StarredApps from "../../components/StarredApps";
// hooks
import { useAnnounce } from "@/hooks";
// dataSources
import { NAV_ITEMS } from "@/dataSources/Dashboard";
// others
import { Link, usePathname } from "@/i18n/navigation";

const Sidebar = ({
  collapseToggleAriaLabel
}: {
  collapseToggleAriaLabel: string;
}) => {
  const tNav = useTranslations("dashboard.sidebar.nav");
  const tAnnounce = useTranslations("common.announce");
  const { announce } = useAnnounce();
  const pathname = usePathname();

  const handleCollapseToggle = (collapsed: boolean) => {
    announce(tAnnounce(collapsed ? "sidebarCollapsed" : "sidebarExpanded"));
  };

  return (
    <UISidebar
      collapsible="icon"
      className="border-border [&_[data-slot=sidebar-inner]]:bg-card top-16! h-[calc(100svh-4rem)]!"
    >
      <CustomSidebarCollapseToggle
        aria-label={collapseToggleAriaLabel}
        onToggle={handleCollapseToggle}
      />
      <SidebarContent className="px-3 py-4 group-data-[collapsible=icon]:px-0">
        <SidebarMenu className="gap-1 group-data-[collapsible=icon]:items-center">
          {NAV_ITEMS.map((item) => {
            const label = tNav(item.key);
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <SidebarMenuItem key={item.key}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={label}
                  className="h-10 gap-3 px-3 text-sm group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:[&>span:last-child]:hidden"
                >
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon aria-hidden="true" />
                    <span>{label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
        <div className="group-data-[collapsible=icon]:hidden">
          <StarredApps />
        </div>
      </SidebarContent>
    </UISidebar>
  );
};

export default Sidebar;
