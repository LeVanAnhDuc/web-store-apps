"use client";

// components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import AvatarUser from "./components/AvatarUser";
import CustomButton from "../CustomButton";
import UserInfoHeader from "./mains/UserInfoHeader";
import MenuItems from "./mains/MenuItems";
import SignOutItem from "./mains/SignoutItem";
// hooks
import useUserInfo from "@/hooks/useUserInfo";

const UserMenu = () => {
  const userInfo = useUserInfo();
  const isLoggedIn = userInfo !== null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <CustomButton variant={"ghost"} className="size-9 rounded-full">
          <AvatarUser
            src={userInfo?.avatar}
            fallback={userInfo?.initials ?? "?"}
          />
        </CustomButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 rounded-xl p-2" align="end">
        {isLoggedIn ? (
          <>
            <UserInfoHeader
              fullName={userInfo.fullName}
              email={userInfo.email}
              avatar={userInfo.avatar}
              initials={userInfo.initials}
            />
            <DropdownMenuSeparator />
            <MenuItems showProfile={true} />
            <DropdownMenuSeparator />
            <SignOutItem />
          </>
        ) : (
          <MenuItems showProfile={false} />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
