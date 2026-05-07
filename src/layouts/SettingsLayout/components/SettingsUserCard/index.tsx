// libs
import { ChevronsUpDown } from "lucide-react";
// components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SettingsUserCard = ({
  fullName,
  email,
  avatar,
  initials
}: {
  fullName: string;
  email: string;
  avatar?: string | null;
  initials: string;
}) => (
  <div className="bg-muted/50 border-border flex items-center gap-2.5 rounded-xl border p-2">
    <Avatar className="size-8 shrink-0">
      <AvatarImage src={avatar ?? ""} alt={fullName} />
      <AvatarFallback className="from-cream to-primary bg-gradient-to-br text-xs font-semibold text-white">
        {initials}
      </AvatarFallback>
    </Avatar>
    <div className="min-w-0 flex-1">
      <p className="text-foreground truncate text-xs font-semibold">
        {fullName}
      </p>
      <p className="text-muted-foreground truncate text-[11px]">{email}</p>
    </div>
    <ChevronsUpDown
      className="text-muted-foreground size-3.5 shrink-0"
      aria-hidden="true"
    />
  </div>
);

export default SettingsUserCard;
