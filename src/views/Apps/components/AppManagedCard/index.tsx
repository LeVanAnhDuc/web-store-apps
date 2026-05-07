// libs
import { ArrowUpRight, Calendar, Eye, EllipsisVertical } from "lucide-react";
// types
import type { LucideIcon } from "lucide-react";
import type { AppStatus } from "@/mocks/Apps";
// components
import CustomButton from "@/components/CustomButton";
import { Card } from "@/components/ui/card";
// others
import { cn } from "@/libs/utils";

const AppManagedCard = ({
  name,
  category,
  description,
  icon: Icon,
  iconColor,
  iconBg,
  status,
  statusLabel,
  views,
  date,
  openLabel,
  menuLabel
}: {
  name: string;
  category: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  status: AppStatus;
  statusLabel: string;
  views: string;
  date: string;
  openLabel: string;
  menuLabel: string;
}) => (
  <Card className="flex flex-col overflow-hidden rounded-2xl border p-0">
    <div className="flex flex-col gap-3.5 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex size-12 shrink-0 items-center justify-center rounded-xl",
              iconBg
            )}
          >
            <Icon className={cn("size-6", iconColor)} />
          </div>
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="text-foreground truncate text-[15px] font-bold">
              {name}
            </span>
            <span className="text-muted-foreground text-xs font-medium">
              {category}
            </span>
          </div>
        </div>
        <CustomButton
          size="icon-sm"
          variant="ghost"
          aria-label={menuLabel}
          className="text-muted-foreground -m-1 size-8"
        >
          <EllipsisVertical className="size-4" />
        </CustomButton>
      </div>
      <p className="text-muted-foreground line-clamp-2 text-[13px] leading-relaxed">
        {description}
      </p>
      <span
        className={cn(
          "w-fit rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
          status === "published"
            ? "bg-green-100 text-green-600"
            : "bg-amber-100 text-amber-600"
        )}
      >
        {statusLabel}
      </span>
    </div>
    <div className="border-border border-t" />
    <div className="flex items-center justify-between px-5 py-3">
      <div className="text-muted-foreground flex items-center gap-3 text-xs">
        <div className="flex items-center gap-1">
          <Eye className="size-3.5" />
          <span className="font-medium">{views}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="size-3.5" />
          <span className="font-medium">{date}</span>
        </div>
      </div>
      <CustomButton
        size="sm"
        className="bg-slate-900 text-white hover:bg-slate-800"
        iconRight={<ArrowUpRight className="size-3" />}
      >
        {openLabel}
      </CustomButton>
    </div>
  </Card>
);

export default AppManagedCard;
