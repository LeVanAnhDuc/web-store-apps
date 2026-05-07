"use client";

// libs
import { useTranslations } from "next-intl";
// components
import UserMenuItem from "../../components/UserMenuItem";
import ThemeSubmenu from "../../components/ThemeSubmenu";
// dataSources
import { UTILITY_MENU_ITEMS } from "@/dataSources/UserMenu";

const UtilityMenuItems = () => {
  const t = useTranslations("common.userMenu");
  return (
    <>
      <ThemeSubmenu />
      {UTILITY_MENU_ITEMS.map((item) => {
        const shortcut =
          item.key === "keyboardShortcuts"
            ? t("keyboardShortcutsHint")
            : undefined;
        return (
          <UserMenuItem
            key={item.key}
            icon={item.icon}
            label={t(item.key)}
            href={item.href}
            shortcut={shortcut}
          />
        );
      })}
    </>
  );
};

export default UtilityMenuItems;
