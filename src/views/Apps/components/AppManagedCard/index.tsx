// libs
import { ArrowUpRight, Calendar, Eye, EllipsisVertical } from "lucide-react";
// types
import type { LucideIcon } from "lucide-react";
import type { AppStatus } from "@/mocks/Apps";
// components
import CustomButton from "@/components/CustomButton";
import { Badge } from "@/components/ui/badge";
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
  <Card
    className="flex flex-col overflow-hidden rounded-2xl border p-0"
    aria-labelledby={`apps-${name}-title`}
  >
    <div className="flex flex-col gap-3.5 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex size-12 shrink-0 items-center justify-center rounded-xl",
              iconBg
            )}
            aria-hidden="true"
          >
            <Icon className={cn("size-6", iconColor)} />
          </div>
          <div className="flex min-w-0 flex-col gap-0.5">
            <h3
              id={`apps-${name}-title`}
              className="text-foreground truncate text-[15px] font-bold"
            >
              {name}
            </h3>
            <span className="text-muted-foreground text-xs font-medium">
              {category}
            </span>
          </div>
        </div>
        <CustomButton
          size="icon-sm"
          variant="ghost"
          aria-label={`${menuLabel} for ${name}`}
          className="text-muted-foreground -m-1 size-8"
        >
          <EllipsisVertical className="size-4" aria-hidden="true" />
        </CustomButton>
      </div>
      <p className="text-muted-foreground line-clamp-2 text-[13px] leading-relaxed">
        {description}
      </p>
      <Badge
        variant="secondary"
        className={cn(
          "rounded-full border-0 px-2.5 py-0.5 text-[11px] font-semibold",
          status === "published"
            ? "bg-green-100 text-green-600"
            : "bg-amber-100 text-amber-600"
        )}
      >
        {statusLabel}
      </Badge>
    </div>
    <div className="border-border border-t" aria-hidden="true" />
    <div className="flex items-center justify-between px-5 py-3">
      <div className="text-muted-foreground flex items-center gap-3 text-xs">
        <div className="flex items-center gap-1">
          <Eye className="size-3.5" aria-hidden="true" />
          <span className="font-medium">
            <span className="sr-only">Views: </span>
            {views}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="size-3.5" aria-hidden="true" />
          <span className="font-medium">
            <span className="sr-only">Updated: </span>
            {date}
          </span>
        </div>
      </div>
      <CustomButton
        size="sm"
        className="bg-slate-900 text-white hover:bg-slate-800"
        iconRight={<ArrowUpRight className="size-3" aria-hidden="true" />}
        aria-label={`${openLabel} ${name}`}
      >
        {openLabel}
      </CustomButton>
    </div>
  </Card>
);

export default AppManagedCard;
