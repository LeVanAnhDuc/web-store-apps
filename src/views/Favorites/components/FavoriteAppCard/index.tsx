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
  <Card className="flex flex-col overflow-hidden rounded-xl border p-0">
    <div className="flex flex-col gap-3 p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex size-12 items-center justify-center rounded-lg",
              iconBg
            )}
          >
            <Icon className="size-6 text-white" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-foreground text-[15px] font-semibold">
              {name}
            </span>
            <span className="text-muted-foreground text-xs">{category}</span>
          </div>
        </div>
        <CustomButton
          size="icon-sm"
          variant="ghost"
          aria-label={removeLabel}
          onClick={onRemove}
          className="text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          <Heart className="size-5 fill-red-500" />
        </CustomButton>
      </div>
      <p className="text-muted-foreground text-[13px]">{description}</p>
    </div>
    <div className="border-border border-t" />
    <div className="flex items-center justify-between px-5 py-3">
      <div className="flex items-center gap-2 text-xs">
        <div className="flex items-center gap-1">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          <span className="text-foreground font-semibold">{rating}</span>
        </div>
        <span className="text-muted-foreground">· {reviewsLabel}</span>
      </div>
      <CustomButton
        size="sm"
        className="bg-indigo-600 text-white hover:bg-indigo-700"
      >
        {openLabel}
      </CustomButton>
    </div>
  </Card>
);

export default FavoriteAppCard;
