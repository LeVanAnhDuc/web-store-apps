// types
import type { LucideIcon } from "lucide-react";
// components
import { Card } from "@/components/ui/card";
// others
import { cn } from "@/libs/utils";

const LoginStatCard = ({
  icon: Icon,
  label,
  value,
  tone
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  tone: "neutral" | "success" | "danger" | "info";
}) => (
  <Card
    className={cn(
      "flex flex-row items-center gap-4 rounded-xl p-5",
      tone === "neutral" && "border-border bg-card",
      tone === "success" && "border-green-200 bg-green-50",
      tone === "danger" && "border-red-200 bg-red-50",
      tone === "info" && "border-blue-200 bg-blue-50"
    )}
  >
    <div
      className={cn(
        "flex size-11 items-center justify-center rounded-xl",
        tone === "neutral" && "bg-slate-100 text-slate-500",
        tone === "success" && "bg-green-100 text-green-600",
        tone === "danger" && "bg-red-100 text-red-600",
        tone === "info" && "bg-blue-100 text-blue-600"
      )}
    >
      <Icon className="size-5" />
    </div>
    <div className="flex flex-col gap-0.5">
      <span
        className={cn(
          "text-2xl font-bold",
          tone === "neutral" && "text-foreground",
          tone === "success" && "text-green-700",
          tone === "danger" && "text-red-700",
          tone === "info" && "text-blue-800"
        )}
      >
        {value}
      </span>
      <span
        className={cn(
          "text-xs font-medium",
          tone === "neutral" && "text-muted-foreground",
          tone === "success" && "text-green-600",
          tone === "danger" && "text-red-600",
          tone === "info" && "text-blue-600"
        )}
      >
        {label}
      </span>
    </div>
  </Card>
);

export default LoginStatCard;
