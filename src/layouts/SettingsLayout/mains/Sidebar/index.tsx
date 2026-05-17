"use client";

// libs
import { useTranslations } from "next-intl";
// components
import * as SidebarUI from "@/components/Sidebar";
import SettingsUserCard from "../../components/SettingsUserCard";
// hooks
import useUserInfo from "@/hooks/useUserInfo";
// dataSources
import {
  SETTINGS_GROUP_ITEMS,
  SETTINGS_MENU_ITEMS
} from "@/dataSources/Settings";

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
  const t = useTranslations("settings.sidebar");
  const tNav = useTranslations("settings.nav");
  const userInfo = useUserInfo();
  const itemsCollapsed = !isMobileOpen && isCollapsed;
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
          <SidebarUI.SectionLabel>{t("menuLabel")}</SidebarUI.SectionLabel>
          <SidebarUI.Nav aria-label={t("menuLabel")}>
            {SETTINGS_MENU_ITEMS.map((item) => (
              <SidebarUI.NavItem
                key={item.key}
                icon={item.icon}
                label={tNav(item.key)}
                href={item.href}
              />
            ))}
          </SidebarUI.Nav>
          <SidebarUI.SectionLabel>{t("settingsLabel")}</SidebarUI.SectionLabel>
          <SidebarUI.Nav aria-label={t("settingsLabel")}>
            {SETTINGS_GROUP_ITEMS.map((item) => (
              <SidebarUI.NavItem
                key={item.key}
                icon={item.icon}
                label={tNav(item.key)}
                href={item.href}
              />
            ))}
          </SidebarUI.Nav>
        </SidebarUI.Content>
        {userInfo && (
          <SidebarUI.Footer>
            <SettingsUserCard
              fullName={userInfo.fullName}
              email={userInfo.email}
              avatar={userInfo.avatar}
              initials={userInfo.initials}
              isCollapsed={itemsCollapsed}
            />
          </SidebarUI.Footer>
        )}
      </SidebarUI.Aside>
    </SidebarUI.Root>
  );
};

export default Sidebar;
