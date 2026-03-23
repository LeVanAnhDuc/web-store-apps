// components
import ProfileMenuItem from "../../components/ProfileMenuItem";
import SettingsMenuItem from "../../components/SettingsMenuItem";
import ThemeToggleMenuItem from "../../components/ThemeToggleMenuItem";

interface MenuItemsProps {
  showProfile: boolean;
}

const MenuItems = ({ showProfile }: MenuItemsProps) => (
  <>
    {showProfile ? <ProfileMenuItem /> : null}
    <SettingsMenuItem />
    <ThemeToggleMenuItem />
  </>
);

export default MenuItems;
