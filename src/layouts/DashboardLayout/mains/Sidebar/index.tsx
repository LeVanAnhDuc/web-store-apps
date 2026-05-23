"use client";

// libs
import { useTranslations } from "next-intl";
// components
import * as SidebarUI from "@/components/Sidebar";
import StarredApps from "../../components/StarredApps";
// dataSources
import { NAV_ITEMS } from "@/dataSources/Dashboard";

const Sidebar = ({
  isCollapsed,
  onCollapsedChange,
  isMobileOpen,
  onMobileOpenChange,
  collapseToggleAriaLabel,
  mobileCloseAriaLabel
}: {
  isCollapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  isMobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
  collapseToggleAriaLabel: string;
  mobileCloseAriaLabel: string;
}) => {
  const tNav = useTranslations("dashboard.sidebar.nav");
  const showExpandedContent = isMobileOpen || !isCollapsed;
  return (
    <SidebarUI.Root
      isCollapsed={isCollapsed}
      onCollapsedChange={onCollapsedChange}
      isMobileOpen={isMobileOpen}
      onMobileOpenChange={onMobileOpenChange}
    >
      <SidebarUI.MobileBackdrop />
      <SidebarUI.Aside>
        <SidebarUI.CollapseToggle aria-label={collapseToggleAriaLabel} />
        <SidebarUI.MobileCloseHeader aria-label={mobileCloseAriaLabel} />
        <SidebarUI.Content>
          <SidebarUI.Nav>
            {NAV_ITEMS.map((item) => (
              <SidebarUI.NavItem
                key={item.key}
                icon={item.icon}
                label={tNav(item.key)}
                href={item.href}
              />
            ))}
          </SidebarUI.Nav>
          {showExpandedContent && <StarredApps />}
        </SidebarUI.Content>
      </SidebarUI.Aside>
    </SidebarUI.Root>
  );
};

export default Sidebar;
