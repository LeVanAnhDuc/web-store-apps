"use client";

// libs
import { useTranslations } from "next-intl";
// components
import {
  SidebarInset,
  SidebarProvider,
  useSidebar
} from "@/components/ui/sidebar";
import Sidebar from "./mains/Sidebar";
import Header from "./mains/Header";
// hooks
import { useAnnounce } from "@/hooks";

const DashboardShell = ({ children }: { children: React.ReactNode }) => {
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
      <Header
        isMobileMenuOpen={openMobile}
        onMobileMenuToggle={handleMobileMenuToggle}
      />
      <div className="flex min-h-0 flex-1">
        <Sidebar
          collapseToggleAriaLabel={tSidebar(
            isCollapsed ? "expand" : "collapse"
          )}
        />
        <SidebarInset className="min-w-0 flex-1 overflow-y-auto p-4 lg:p-6">
          <div id="main-content" tabIndex={-1}>
            {children}
          </div>
        </SidebarInset>
      </div>
    </div>
  );
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider defaultOpen>
    <DashboardShell>{children}</DashboardShell>
  </SidebarProvider>
);

export default DashboardLayout;
