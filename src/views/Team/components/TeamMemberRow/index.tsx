// types
import type { TeamRole } from "@/mocks/Team";
// components
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import CustomButton from "@/components/CustomButton";
import RoleBadge from "../RoleBadge";
// others
import { cn } from "@/libs/utils";

const TeamMemberRow = ({
  fullName,
  email,
  initials,
  avatarFromColor,
  avatarToColor,
  role,
  roleLabel,
  removeLabel,
  showRemove,
  onRemove
}: {
  fullName: string;
  email: string;
  initials: string;
  avatarFromColor: string;
  avatarToColor: string;
  role: TeamRole;
  roleLabel: string;
  removeLabel: string;
  showRemove: boolean;
  onRemove: () => void;
}) => (
  <div className="border-border flex flex-wrap items-center gap-4 border-b px-6 py-4 last:border-b-0">
    <Avatar className="size-10 shrink-0">
      <AvatarFallback
        className={cn(
          "bg-gradient-to-br text-xs font-semibold text-white",
          avatarFromColor,
          avatarToColor
        )}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
    <div className="min-w-0 flex-1">
      <p className="text-foreground truncate text-sm font-semibold">
        {fullName}
      </p>
      <p className="text-muted-foreground truncate text-sm">{email}</p>
    </div>
    <RoleBadge role={role} label={roleLabel} />
    {showRemove ? (
      <CustomButton variant="outline" size="sm" onClick={onRemove}>
        {removeLabel}
      </CustomButton>
    ) : null}
  </div>
);

export default TeamMemberRow;
