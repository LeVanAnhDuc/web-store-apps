// libs
import { ArrowUpRight, Star } from "lucide-react";
// types
import type { LucideIcon } from "lucide-react";
// components
import CustomButton from "@/components/CustomButton";
import { Card } from "@/components/ui/card";
// others
import { cn } from "@/libs/utils";

const DiscoverAppCard = ({
  name,
  category,
  description,
  rating,
  icon: Icon,
  iconColor,
  iconBg,
  openLabel
}: {
  name: string;
  category: string;
  description: string;
  rating: number;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  openLabel: string;
}) => (
  <Card
    className="flex flex-col gap-3.5 rounded-xl border p-6"
    aria-labelledby={`discover-${name}-title`}
  >
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "flex size-13 items-center justify-center rounded-xl",
          iconBg
        )}
        aria-hidden="true"
      >
        <Icon className={cn("size-6.5", iconColor)} />
      </div>
      <div className="flex min-w-0 flex-col gap-0.5">
        <h3
          id={`discover-${name}-title`}
          className="text-foreground truncate text-base font-semibold"
        >
          {name}
        </h3>
        <span className="text-muted-foreground text-xs font-medium">
          {category}
        </span>
      </div>
    </div>
    <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
      {description}
    </p>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <Star
          className="fill-warning text-warning size-3.5"
          aria-hidden="true"
        />
        <span className="text-foreground text-xs font-semibold">
          <span className="sr-only">Rating: </span>
          {rating}
        </span>
      </div>
      <CustomButton
        size="sm"
        iconRight={<ArrowUpRight className="size-3" aria-hidden="true" />}
        aria-label={`${openLabel} ${name}`}
      >
        {openLabel}
      </CustomButton>
    </div>
  </Card>
);

export default DiscoverAppCard;
