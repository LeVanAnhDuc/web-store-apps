"use client";

// libs
import { useTranslations } from "next-intl";
// components
import {
  SidebarInset,
  SidebarProvider,
  useSidebar
} from "@/components/ui/sidebar";
import DashboardHeader from "@/layouts/DashboardLayout/mains/Header";
import Sidebar from "./mains/Sidebar";
// hooks
import { useAnnounce } from "@/hooks";

const SettingsShell = ({ children }: { children: React.ReactNode }) => {
  const tAnnounce = useTranslations("common.announce");
  const tSidebar = useTranslations("common.sidebar");
  const { announce } = useAnnounce();
  const { state, openMobile, setOpenMobile } = useSidebar();
  const isCollapsed = state === "collapsed";

  const handleMobileMenuToggle = () => {
    const next = !openMobile;
    announce(tAnnounce(next ? "mobileMenuOpened" : "mobileMenuClosed"));
    setOpenMobile(next);
  };

  return (
    <div className="bg-background flex h-screen flex-col overflow-hidden">
      <DashboardHeader
        isMobileMenuOpen={openMobile}
        onMobileMenuToggle={handleMobileMenuToggle}
      />
      <div className="flex min-h-0 flex-1">
        <Sidebar
          collapseToggleAriaLabel={tSidebar(
            isCollapsed ? "expand" : "collapse"
          )}
        />
        <SidebarInset className="min-w-0 flex-1 overflow-y-auto">
          <main id="main-content" tabIndex={-1} className="space-y-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </div>
  );
};

const SettingsLayout = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider defaultOpen>
    <SettingsShell>{children}</SettingsShell>
  </SidebarProvider>
);

export default SettingsLayout;
