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
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import NotificationPanel from "../../components/NotificationPanel";
// hooks
import { useAnnounce } from "@/hooks";
// others
import { NOTIFICATIONS_MOCK } from "@/mocks/Dashboard";

const Header = ({
  isMobileMenuOpen,
  onMobileMenuToggle
}: {
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
}) => {
  const t = useTranslations("dashboard.header");
  const { announce } = useAnnounce();
  const [searchValue, setSearchValue] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);

  const unreadCount = NOTIFICATIONS_MOCK.filter((n) => !n.isRead).length;

  const handleNotifOpenChange = (open: boolean) => {
    setNotifOpen(open);
    if (open) announce(t("notificationsLabel"));
  };

  return (
    <header className="border-border bg-card/80 sticky top-0 z-20 flex h-16 items-center justify-between border-b px-4 backdrop-blur-sm lg:px-6">
      <div className="flex items-center gap-4">
        <CustomButton
          variant="ghost"
          size="icon"
          aria-label={t("menuToggleLabel")}
          className="lg:hidden"
          onClick={onMobileMenuToggle}
        >
          {isMobileMenuOpen ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
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
          aria-label={t("searchLabel")}
          className="relative md:hidden"
        >
          <Search className="size-5" aria-hidden="true" />
        </CustomButton>
        <Popover open={notifOpen} onOpenChange={handleNotifOpenChange}>
          <PopoverTrigger asChild>
            <CustomButton
              variant="ghost"
              size="icon"
              aria-label={t("notificationsLabel")}
              className="relative"
            >
              <Bell className="size-5" aria-hidden="true" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full p-0 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </CustomButton>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-auto p-0">
            <NotificationPanel />
          </PopoverContent>
        </Popover>
        <LocaleDialog />
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
