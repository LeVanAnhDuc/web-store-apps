// components
import ProfileMenuItem from "../../components/ProfileMenuItem";
import SettingsMenuItem from "../../components/SettingsMenuItem";
import ThemeToggleMenuItem from "../../components/ThemeToggleMenuItem";

const MenuItems = ({ showProfile }: { showProfile: boolean }) => (
  <>
    {showProfile ? <ProfileMenuItem /> : null}
    <SettingsMenuItem />
    <ThemeToggleMenuItem />
  </>
);

export default MenuItems;
