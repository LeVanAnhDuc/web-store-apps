// libs
import { Mail } from "lucide-react";
// components
import { Badge } from "@/components/ui/badge";
import CustomButton from "@/components/CustomButton";

const PendingInvitationRow = ({
  email,
  sentAtLabel,
  pendingLabel,
  revokeLabel,
  onRevoke
}: {
  email: string;
  sentAtLabel: string;
  pendingLabel: string;
  revokeLabel: string;
  onRevoke: () => void;
}) => (
  <div className="border-border flex flex-wrap items-center gap-4 border-b px-6 py-4 last:border-b-0">
    <div className="bg-muted/60 border-border flex size-10 shrink-0 items-center justify-center rounded-xl border">
      <Mail className="text-muted-foreground size-4" aria-hidden="true" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-foreground truncate text-sm font-semibold">{email}</p>
      <p className="text-muted-foreground truncate text-sm">{sentAtLabel}</p>
    </div>
    <Badge
      variant="secondary"
      className="bg-warning/20 text-warning-foreground rounded-full px-2.5 py-0.5"
    >
      {pendingLabel}
    </Badge>
    <CustomButton variant="outline" size="sm" onClick={onRevoke}>
      {revokeLabel}
    </CustomButton>
  </div>
);

export default PendingInvitationRow;
