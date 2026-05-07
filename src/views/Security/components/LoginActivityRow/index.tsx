// libs
import type { LucideIcon } from "lucide-react";
// others
import { cn } from "@/libs/utils";

const LoginActivityRow = ({
  icon: Icon,
  title,
  meta,
  timestamp,
  status
}: {
  icon: LucideIcon;
  title: string;
  meta: string;
  timestamp: string;
  status: "success" | "warning";
}) => (
  <div className="border-border flex flex-wrap items-center gap-4 border-b px-6 py-3.5 last:border-b-0">
    <div
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-xl",
        status === "success"
          ? "bg-success/15 text-success"
          : "bg-warning/20 text-warning-foreground"
      )}
    >
      <Icon className="size-4" aria-hidden="true" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-foreground truncate text-sm font-semibold">{title}</p>
      <p className="text-muted-foreground truncate text-xs">{meta}</p>
    </div>
    <span className="text-muted-foreground shrink-0 text-xs">{timestamp}</span>
  </div>
);

export default LoginActivityRow;
