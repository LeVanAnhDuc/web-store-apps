"use client";

// libs
import { useState } from "react";
import { useTranslations } from "next-intl";
// components
import Sidebar from "./mains/Sidebar";
import Header from "./mains/Header";
// hooks
import { useAnnounce } from "@/hooks";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const tAnnounce = useTranslations("common.announce");
  const tSidebar = useTranslations("common.sidebar");
  const { announce } = useAnnounce();

  const handleCollapsedChange = (collapsed: boolean) => {
    announce(tAnnounce(collapsed ? "sidebarCollapsed" : "sidebarExpanded"));
    setIsSidebarCollapsed(collapsed);
  };

  const handleMobileOpenChange = (open: boolean) => {
    announce(tAnnounce(open ? "mobileMenuOpened" : "mobileMenuClosed"));
    setIsMobileMenuOpen(open);
  };

  return (
    <div className="bg-background flex h-screen flex-col overflow-hidden">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => handleMobileOpenChange(!isMobileMenuOpen)}
      />
      <div className="flex min-h-0 flex-1">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onCollapsedChange={handleCollapsedChange}
          isMobileOpen={isMobileMenuOpen}
          onMobileOpenChange={handleMobileOpenChange}
          collapseToggleAriaLabel={tSidebar(
            isSidebarCollapsed ? "expand" : "collapse"
          )}
          mobileCloseAriaLabel={tSidebar("closeMobile")}
        />
        <main
          id="main-content"
          tabIndex={-1}
          className="min-w-0 flex-1 overflow-y-auto p-4 lg:p-6"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
