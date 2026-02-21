// libs
import { Mail } from "lucide-react";
// components
import AvatarUser from "../../components/AvatarUser";

const UserInfoHeader = () => (
  <div className="flex items-center gap-3 p-3 transition-colors duration-300">
    <AvatarUser className="size-10" />
    <div className="min-w-0 flex-1">
      <p className="text-foreground truncate font-semibold">John Doe</p>
      <div className="text-muted-foreground mt-0.5 flex items-center gap-1 text-sm">
        <Mail className="text-muted-foreground size-4" />
        <span className="truncate">John.doe@email.com</span>
      </div>
    </div>
  </div>
);

export default UserInfoHeader;
