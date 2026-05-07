"use client";

// libs
import { useTranslations } from "next-intl";
// components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import CustomButton from "../CustomButton";
import AvatarUser from "./components/AvatarUser";
import UserInfoHeader from "./mains/UserInfoHeader";
import SettingsMenuItems from "./mains/SettingsMenuItems";
import UtilityMenuItems from "./mains/UtilityMenuItems";
import SignOutItem from "./mains/SignoutItem";
// hooks
import useUserInfo from "@/hooks/useUserInfo";

const UserMenu = () => {
  const t = useTranslations("common.userMenu");
  const userInfo = useUserInfo();
  const isLoggedIn = userInfo !== null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <CustomButton
          variant="ghost"
          aria-label={t("trigger")}
          className="size-9 rounded-full p-0"
        >
          <AvatarUser
            src={userInfo?.avatar}
            fallback={userInfo?.initials ?? "?"}
          />
        </CustomButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60 rounded-xl p-1"
        align="end"
        sideOffset={8}
      >
        {isLoggedIn ? (
          <>
            <UserInfoHeader
              fullName={userInfo.fullName}
              email={userInfo.email}
              avatar={userInfo.avatar}
              initials={userInfo.initials}
            />
            <DropdownMenuSeparator />
            <SettingsMenuItems />
            <DropdownMenuSeparator />
            <UtilityMenuItems />
            <DropdownMenuSeparator />
            <SignOutItem />
          </>
        ) : (
          <UtilityMenuItems />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
