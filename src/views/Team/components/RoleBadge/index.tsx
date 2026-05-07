// types
import type { TeamRole } from "@/mocks/Team";
// components
import { Badge } from "@/components/ui/badge";
// others
import { cn } from "@/libs/utils";

const RoleBadge = ({ role, label }: { role: TeamRole; label: string }) => {
  const tone =
    role === "owner"
      ? "bg-primary/15 text-primary"
      : role === "admin"
        ? "bg-success/15 text-success"
        : "bg-muted text-muted-foreground";
  return (
    <Badge
      variant="secondary"
      className={cn("rounded-full px-2.5 py-0.5", tone)}
    >
      {label}
    </Badge>
  );
};

export default RoleBadge;
