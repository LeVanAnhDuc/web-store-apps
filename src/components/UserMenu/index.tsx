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
import SignOutItem from "./mains/SignOutItem";

const UserMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <CustomButton variant={"ghost"} className="size-9 rounded-full">
        <AvatarUser />
      </CustomButton>
    </DropdownMenuTrigger>

    <DropdownMenuContent className="w-72 rounded-xl p-2" align="end">
      <UserInfoHeader />
      <DropdownMenuSeparator />
      <MenuItems />
      <DropdownMenuSeparator />
      <SignOutItem />
    </DropdownMenuContent>
  </DropdownMenu>
);

export default UserMenu;
