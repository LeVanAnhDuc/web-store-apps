// libs
import { Mail } from "lucide-react";
// components
import AvatarUser from "../../components/AvatarUser";

interface UserInfoHeaderProps {
  fullName: string;
  email: string;
  avatar?: string | null;
  initials: string;
}

const UserInfoHeader = ({
  fullName,
  email,
  avatar,
  initials
}: UserInfoHeaderProps) => (
  <div className="flex items-center gap-3 p-3 transition-colors duration-300">
    <AvatarUser src={avatar} fallback={initials} className="size-10" />
    <div className="min-w-0 flex-1">
      <p className="text-foreground truncate font-semibold">{fullName}</p>
      <div className="text-muted-foreground mt-0.5 flex items-center gap-1 text-sm">
        <Mail className="text-muted-foreground size-4" />
        <span className="truncate">{email}</span>
      </div>
    </div>
  </div>
);

export default UserInfoHeader;
