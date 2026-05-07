"use client";

// libs
import type { LucideIcon } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
// components
import { Badge } from "@/components/ui/badge";
import CustomButton from "@/components/CustomButton";

const ConnectedAccountRow = ({
  icon: Icon,
  name,
  email,
  isConnected,
  connectedLabel,
  connectLabel,
  disconnectLabel,
  onToggle
}: {
  icon: LucideIcon;
  name: string;
  email: string;
  isConnected: boolean;
  connectedLabel: string;
  connectLabel: string;
  disconnectLabel: string;
  onToggle: () => void;
}) => (
  <div className="border-border flex flex-wrap items-center gap-4 border-b px-6 py-4 last:border-b-0">
    <div className="bg-muted/60 border-border flex size-10 shrink-0 items-center justify-center rounded-xl border">
      <Icon className="text-foreground size-5" aria-hidden="true" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-foreground truncate text-sm font-semibold">{name}</p>
      <p className="text-muted-foreground truncate text-xs">{email}</p>
    </div>
    {isConnected ? (
      <>
        <Badge
          variant="secondary"
          className="bg-success/15 text-success rounded-full px-2.5 py-0.5"
        >
          <CheckCircle2 className="size-3" aria-hidden="true" />
          <span>{connectedLabel}</span>
        </Badge>
        <CustomButton variant="outline" size="sm" onClick={onToggle}>
          {disconnectLabel}
        </CustomButton>
      </>
    ) : (
      <CustomButton size="sm" onClick={onToggle}>
        {connectLabel}
      </CustomButton>
    )}
  </div>
);

export default ConnectedAccountRow;
