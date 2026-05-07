// libs
import { ArrowUpRight, Timer } from "lucide-react";
// types
import type { LucideIcon } from "lucide-react";
// components
import CustomButton from "@/components/CustomButton";
import { Card } from "@/components/ui/card";
// others
import { cn } from "@/libs/utils";

const RecentAppRow = ({
  name,
  category,
  time,
  icon: Icon,
  iconColor,
  iconBg,
  openLabel
}: {
  name: string;
  category: string;
  time: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  openLabel: string;
}) => (
  <Card className="flex flex-row items-center gap-3.5 rounded-xl border p-4">
    <div
      className={cn(
        "flex size-11 shrink-0 items-center justify-center rounded-xl",
        iconBg
      )}
    >
      <Icon className={cn("size-5.5", iconColor)} />
    </div>
    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
      <span className="text-foreground text-sm font-semibold">{name}</span>
      <span className="text-muted-foreground text-xs">{category}</span>
    </div>
    <div className="flex items-center gap-1.5 text-indigo-500">
      <Timer className="size-3.5" />
      <span className="text-xs font-semibold">{time}</span>
    </div>
    <CustomButton
      size="sm"
      className="bg-slate-900 text-white hover:bg-slate-800"
      iconRight={<ArrowUpRight className="size-3" />}
    >
      {openLabel}
    </CustomButton>
  </Card>
);

export default RecentAppRow;
