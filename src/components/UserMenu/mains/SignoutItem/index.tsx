"use client";

// libs
import { useState } from "react";
import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
// components
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
// stores
import { useAuthStore } from "@/stores";
// i18n
import { useRouter } from "@/i18n/navigation";
// others
import CONSTANTS from "@/constants";

const { LOGIN } = CONSTANTS.ROUTES;

const SignOutItem = () => {
  const router = useRouter();
  const t = useTranslations("common");
  const logout = useAuthStore((state) => state.logout);
  const [isPending, setIsPending] = useState(false);

  const handleLogout = async () => {
    setIsPending(true);
    try {
      await logout();
    } finally {
      setIsPending(false);
      router.push(LOGIN);
    }
  };

  return (
    <DropdownMenuItem
      className="group focus:bg-destructive/10 dark:focus:bg-destructive/20 cursor-pointer rounded-lg px-3 py-2 transition-colors duration-300"
      disabled={isPending}
      onClick={handleLogout}
    >
      <div className="text-destructive flex w-full items-center gap-3">
        <div className="bg-destructive/10 dark:bg-destructive/20 flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-300">
          <LogOut className="size-4" />
        </div>
        <div className="flex-1">
          <p className="text-destructive text-sm font-semibold transition-colors duration-300">
            {t("userMenu.signOut")}
          </p>
          <p className="text-destructive/70 text-xs transition-colors duration-300">
            {t("userMenu.logoutDescription")}
          </p>
        </div>
      </div>
    </DropdownMenuItem>
  );
};

export default SignOutItem;
