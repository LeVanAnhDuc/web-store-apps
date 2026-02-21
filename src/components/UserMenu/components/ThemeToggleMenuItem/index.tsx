"use client";

// libs
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
// components
import MenuItemBase from "../MenuItemBase";

const ThemeToggleMenuItem = () => {
  const t = useTranslations("common");
  const { setTheme, theme } = useTheme();

  const isDarkMode = theme === "dark";

  const handleToggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

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
