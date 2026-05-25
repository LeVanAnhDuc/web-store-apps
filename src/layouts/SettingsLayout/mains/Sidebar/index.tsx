"use client";

// libs
import { useTranslations } from "next-intl";
// components
import { CustomSidebarCollapseToggle } from "@/components/CustomSidebar";
import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
import SettingsUserCard from "../../components/SettingsUserCard";
// hooks
import { useAnnounce, useUserInfo } from "@/hooks";
// dataSources
import {
  SETTINGS_GROUP_ITEMS,
  SETTINGS_MENU_ITEMS
} from "@/dataSources/Settings";
// others
import { Link, usePathname } from "@/i18n/navigation";

const Sidebar = ({
  collapseToggleAriaLabel
}: {
  collapseToggleAriaLabel: string;
}) => {
  const t = useTranslations("settings.sidebar");
  const tNav = useTranslations("settings.nav");
  const tAnnounce = useTranslations("common.announce");
  const { announce } = useAnnounce();
  const { state, isMobile } = useSidebar();
  const userInfo = useUserInfo();
  const pathname = usePathname();
  const isFooterCollapsed = !isMobile && state === "collapsed";

  const handleCollapseToggle = (collapsed: boolean) => {
    announce(tAnnounce(collapsed ? "sidebarCollapsed" : "sidebarExpanded"));
  };

  return (
    <UISidebar className="border-border [&_[data-slot=sidebar-inner]]:bg-card top-16! h-[calc(100svh-4rem)]!">
      <CustomSidebarCollapseToggle
        aria-label={collapseToggleAriaLabel}
        onToggle={handleCollapseToggle}
      />
      <SidebarContent className="px-3 py-4 group-data-[collapsible=icon]:px-0">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-muted-foreground mt-5 mb-2 h-auto px-2 text-xs font-semibold tracking-[0.12em] uppercase">
            {t("menuLabel")}
          </SidebarGroupLabel>
          <SidebarMenu
            className="gap-1 group-data-[collapsible=icon]:items-center"
            aria-label={t("menuLabel")}
          >
            {SETTINGS_MENU_ITEMS.map((item) => {
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
        </SidebarGroup>
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-muted-foreground mt-5 mb-2 h-auto px-2 text-xs font-semibold tracking-[0.12em] uppercase">
            {t("settingsLabel")}
          </SidebarGroupLabel>
          <SidebarMenu
            className="gap-1 group-data-[collapsible=icon]:items-center"
            aria-label={t("settingsLabel")}
          >
            {SETTINGS_GROUP_ITEMS.map((item) => {
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
        </SidebarGroup>
      </SidebarContent>
      {userInfo && (
        <SidebarFooter className="border-border border-t p-3">
          <SettingsUserCard
            fullName={userInfo.fullName}
            email={userInfo.email}
            avatar={userInfo.avatar}
            initials={userInfo.initials}
            isCollapsed={isFooterCollapsed}
          />
        </SidebarFooter>
      )}
    </UISidebar>
  );
};

export default Sidebar;
