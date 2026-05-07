// libs
import { Heart, Star } from "lucide-react";
// types
import type { LucideIcon } from "lucide-react";
// components
import CustomButton from "@/components/CustomButton";
import { Card } from "@/components/ui/card";
// others
import { cn } from "@/libs/utils";

const FavoriteAppCard = ({
  name,
  category,
  description,
  rating,
  icon: Icon,
  iconBg,
  openLabel,
  reviewsLabel,
  removeLabel,
  onRemove
}: {
  name: string;
  category: string;
  description: string;
  rating: number;
  icon: LucideIcon;
  iconBg: string;
  openLabel: string;
  reviewsLabel: string;
  removeLabel: string;
  onRemove: () => void;
}) => (
  <Card
    className="flex flex-col overflow-hidden rounded-xl border p-0"
    aria-labelledby={`fav-${name}-title`}
  >
    <div className="flex flex-col gap-3 p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex size-12 items-center justify-center rounded-lg",
              iconBg
            )}
            aria-hidden="true"
          >
            <Icon className="text-primary-foreground size-6" />
          </div>
          <div className="flex flex-col gap-0.5">
            <h3
              id={`fav-${name}-title`}
              className="text-foreground text-[15px] font-semibold"
            >
              {name}
            </h3>
            <span className="text-muted-foreground text-xs">{category}</span>
          </div>
        </div>
        <CustomButton
          size="icon-sm"
          variant="ghost"
          aria-label={`${removeLabel}: ${name}`}
          aria-pressed="true"
          onClick={onRemove}
          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <Heart className="fill-destructive size-5" aria-hidden="true" />
        </CustomButton>
      </div>
      <p className="text-muted-foreground text-[13px]">{description}</p>
    </div>
    <div className="border-border border-t" aria-hidden="true" />
    <div className="flex items-center justify-between px-5 py-3">
      <div className="flex items-center gap-2 text-xs">
        <div className="flex items-center gap-1">
          <Star
            className="fill-warning text-warning size-3.5"
            aria-hidden="true"
          />
          <span className="text-foreground font-semibold">
            <span className="sr-only">Rating: </span>
            {rating}
          </span>
        </div>
        <span aria-hidden="true" className="text-muted-foreground">
          ·
        </span>
        <span className="text-muted-foreground">{reviewsLabel}</span>
      </div>
      <CustomButton size="sm" aria-label={`${openLabel} ${name}`}>
        {openLabel}
      </CustomButton>
    </div>
  </Card>
);

export default FavoriteAppCard;
