"use client";

// libs
import { useState } from "react";
import { Search, Bell, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
// components
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import UserMenu from "@/components/UserMenu";
import LocaleDialog from "@/components/LocaleDialog";
import Logo from "@/components/Logo";
import { Badge } from "@/components/ui/badge";

const Header = ({
  isMobileMenuOpen,
  onMobileMenuToggle
}: {
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
}) => {
  const t = useTranslations("dashboard.header");
  const [searchValue, setSearchValue] = useState("");

  return (
    <header className="border-border bg-card/80 sticky top-0 z-30 flex h-16 items-center justify-between border-b px-4 backdrop-blur-sm lg:px-6">
      <div className="flex items-center gap-4">
        <CustomButton
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMobileMenuToggle}
        >
          {isMobileMenuOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </CustomButton>

        <div className="hidden items-center gap-2 lg:flex">
          <Logo />
          <span className="text-foreground text-lg font-semibold">
            {t("appName")}
          </span>
        </div>
      </div>

      <div className="mx-4 hidden max-w-md flex-1 md:block">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <CustomInput
            placeholder={t("searchPlaceholder")}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="h-10 pl-10"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <CustomButton
          variant="ghost"
          size="icon"
          className="relative md:hidden"
        >
          <Search className="size-5" />
        </CustomButton>

        <CustomButton variant="ghost" size="icon" className="relative">
          <Bell className="size-5" />
          <Badge className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full p-0 text-xs">
            3
          </Badge>
        </CustomButton>

        <LocaleDialog />
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
