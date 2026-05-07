"use client";

// libs
import { useTranslations } from "next-intl";
// components
import UserMenuItem from "../../components/UserMenuItem";
// dataSources
import { SETTINGS_MENU_ITEMS } from "@/dataSources/UserMenu";

const SettingsMenuItems = () => {
  const t = useTranslations("common.userMenu");
  return (
    <>
      {SETTINGS_MENU_ITEMS.map((item) => (
        <UserMenuItem
          key={item.key}
          icon={item.icon}
          label={t(item.key)}
          href={item.href}
        />
      ))}
    </>
  );
};

export default SettingsMenuItems;
