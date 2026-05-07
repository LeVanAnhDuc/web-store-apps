"use client";

// libs
import { ChevronsUpDown } from "lucide-react";
import { useTranslations } from "next-intl";
// components
import CustomButton from "@/components/CustomButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import SettingsNavItem from "../../components/SettingsNavItem";
import SettingsUserCard from "../../components/SettingsUserCard";
// hooks
import useUserInfo from "@/hooks/useUserInfo";
// dataSources
import {
  SETTINGS_GROUP_ITEMS,
  SETTINGS_MENU_ITEMS
} from "@/dataSources/Settings";

const Sidebar = () => {
  const t = useTranslations("settings.sidebar");
  const tNav = useTranslations("settings.nav");
  const userInfo = useUserInfo();

  return (
    <aside className="bg-card border-border hidden h-screen w-[260px] shrink-0 flex-col border-r lg:flex">
      <ScrollArea className="flex-1 px-4 pt-5 pb-4">
        <div className="flex items-center justify-between pb-3">
          <span className="text-foreground text-sm font-semibold">
            {t("navigation")}
          </span>
          <CustomButton
            variant="outline"
            size="icon"
            aria-label={t("toggle")}
            className="size-8 rounded-lg"
          >
            <ChevronsUpDown className="size-3.5" aria-hidden="true" />
          </CustomButton>
        </div>
        <p className="text-muted-foreground mt-3 mb-2 text-[10px] font-semibold tracking-[0.12em] uppercase">
          {t("menuLabel")}
        </p>
        <nav className="flex flex-col gap-0.5" aria-label={t("menuLabel")}>
          {SETTINGS_MENU_ITEMS.map((item) => (
            <SettingsNavItem
              key={item.key}
              icon={item.icon}
              label={tNav(item.key)}
              href={item.href}
            />
          ))}
        </nav>
        <p className="text-muted-foreground mt-5 mb-2 text-[10px] font-semibold tracking-[0.12em] uppercase">
          {t("settingsLabel")}
        </p>
        <nav className="flex flex-col gap-0.5" aria-label={t("settingsLabel")}>
          {SETTINGS_GROUP_ITEMS.map((item) => (
            <SettingsNavItem
              key={item.key}
              icon={item.icon}
              label={tNav(item.key)}
              href={item.href}
            />
          ))}
        </nav>
      </ScrollArea>
      <div className="border-border border-t px-3 py-3">
        {userInfo ? (
          <SettingsUserCard
            fullName={userInfo.fullName}
            email={userInfo.email}
            avatar={userInfo.avatar}
            initials={userInfo.initials}
          />
        ) : null}
      </div>
    </aside>
  );
};

export default Sidebar;
