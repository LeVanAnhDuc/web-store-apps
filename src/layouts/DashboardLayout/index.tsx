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
  const { announce } = useAnnounce();

  const handleCollapsedChange = (collapsed: boolean) => {
    announce(tAnnounce(collapsed ? "sidebarCollapsed" : "sidebarExpanded"));
    setIsSidebarCollapsed(collapsed);
  };

  const handleMobileMenuToggle = () => {
    const willOpen = !isMobileMenuOpen;
    announce(tAnnounce(willOpen ? "mobileMenuOpened" : "mobileMenuClosed"));
    setIsMobileMenuOpen(willOpen);
  };

  return (
    <div className="bg-background flex h-screen overflow-hidden">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onCollapsedChange={handleCollapsedChange}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={handleMobileMenuToggle}
        />

        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 overflow-y-auto p-4 lg:p-6"
        >
          <div className="mx-auto max-w-7xl space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
