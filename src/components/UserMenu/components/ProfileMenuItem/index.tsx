"use client";

// Why "use client"?
// This component is rendered inside DropdownMenu (shadcn) which is a client component.
// useTranslations hook requires client-side rendering.

// libs
import { User } from "lucide-react";
import { useTranslations } from "next-intl";
// components
import MenuItemBase from "../MenuItemBase";

const ProfileMenuItem = () => {
  const t = useTranslations("common");

  return (
    <MenuItemBase
      icon={User}
      label={t("userMenu.profile")}
      description={t("userMenu.profileDescription")}
      href="/profile"
    />
  );
};

export default ProfileMenuItem;
