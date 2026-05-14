"use client";

// libs
import { useTranslations } from "next-intl";
// components
import DashboardHeader from "@/layouts/DashboardLayout/mains/Header";
import Sidebar from "./mains/Sidebar";
// hooks
import { useAnnounce } from "@/hooks";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const tAnnounce = useTranslations("common.announce");
  const { announce } = useAnnounce();

  const handleMobileMenuToggle = () => {
    announce(tAnnounce("mobileMenuOpened"));
  };

  return (
    <div className="bg-background flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader
          isMobileMenuOpen={false}
          onMobileMenuToggle={handleMobileMenuToggle}
        />
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 overflow-y-auto"
        >
          <div className="space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default SettingsLayout;
