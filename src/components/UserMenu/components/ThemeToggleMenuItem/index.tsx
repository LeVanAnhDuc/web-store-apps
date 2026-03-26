"use client";

// libs
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
// components
import MenuItemBase from "../MenuItemBase";
// hooks
import { useAnnounce } from "@/hooks";

const ThemeToggleMenuItem = () => {
  const t = useTranslations("common");
  const { setTheme, theme } = useTheme();
  const { announce } = useAnnounce();

  const isDarkMode = theme === "dark";

  const handleToggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    announce(
      t(
        next === "dark" ? "userMenu.switchedToDark" : "userMenu.switchedToLight"
      )
    );
  };

  return (
    <MenuItemBase
      icon={isDarkMode ? Sun : Moon}
      label={isDarkMode ? t("userMenu.lightMode") : t("userMenu.darkMode")}
      description={
        isDarkMode
          ? t("userMenu.lightModeDescription")
          : t("userMenu.darkModeDescription")
      }
      onClick={handleToggleTheme}
    />
  );
};

export default ThemeToggleMenuItem;
