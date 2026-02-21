"use client";

// Why "use client"?
// This component is rendered inside DropdownMenu (shadcn) which is a client component.
// useTranslations hook requires client-side rendering.

// libs
import { Settings } from "lucide-react";
import { useTranslations } from "next-intl";
// components
import MenuItemBase from "../MenuItemBase";

const SettingsMenuItem = () => {
  const t = useTranslations("common");

  return (
    <MenuItemBase
      icon={Settings}
      label={t("userMenu.settings")}
      description={t("userMenu.settingsDescription")}
      href="/settings"
    />
  );
};

export default SettingsMenuItem;
