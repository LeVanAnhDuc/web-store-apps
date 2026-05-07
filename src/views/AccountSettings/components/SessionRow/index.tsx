"use client";

// libs
import type { LucideIcon } from "lucide-react";
// components
import { Badge } from "@/components/ui/badge";
import CustomButton from "@/components/CustomButton";

const SessionRow = ({
  icon: Icon,
  device,
  location,
  lastActive,
  isCurrent,
  activeLabel,
  revokeLabel,
  onRevoke
}: {
  icon: LucideIcon;
  device: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
  activeLabel: string;
  revokeLabel: string;
  onRevoke?: () => void;
}) => (
  <div className="border-border flex flex-wrap items-center gap-4 border-b px-6 py-4 last:border-b-0">
    <div className="bg-muted/60 border-border flex size-10 shrink-0 items-center justify-center rounded-xl border">
      <Icon className="text-foreground size-5" aria-hidden="true" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-foreground truncate text-sm font-semibold">{device}</p>
      <p className="text-muted-foreground truncate text-xs">
        {location} · {lastActive}
      </p>
    </div>
    {isCurrent ? (
      <Badge
        variant="secondary"
        className="bg-success/15 text-success rounded-full px-2.5 py-0.5"
      >
        {activeLabel}
      </Badge>
    ) : (
      <CustomButton variant="outline" size="sm" onClick={onRevoke}>
        {revokeLabel}
      </CustomButton>
    )}
  </div>
);

export default SessionRow;
