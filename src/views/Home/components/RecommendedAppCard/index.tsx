// libs
import { Star } from "lucide-react";
// types
import type { ReactNode } from "react";
// components
import { Card } from "@/components/ui/card";
import CustomButton from "@/components/CustomButton";
// others
import { cn } from "@/libs/utils";

const RecommendedAppCard = ({
  name,
  category,
  rating,
  icon,
  gradient,
  installLabel,
  freeLabel
}: {
  name: string;
  category: string;
  rating: number;
  icon: ReactNode;
  gradient: string;
  installLabel: string;
  freeLabel: string;
}) => (
  <Card className="flex flex-col gap-4 rounded-2xl border p-5">
    <div
      className={cn(
        "flex h-24 items-center justify-center rounded-xl",
        gradient
      )}
    >
      {icon}
    </div>
    <div className="flex flex-col gap-1">
      <span className="text-foreground text-base font-semibold">{name}</span>
      <span className="text-muted-foreground text-xs">{category}</span>
    </div>
    <div className="flex items-center gap-1">
      <Star className="size-3.5 fill-amber-400 text-amber-400" />
      <span className="text-foreground text-xs font-semibold">{rating}</span>
      <span className="text-muted-foreground text-xs">· {freeLabel}</span>
    </div>
    <CustomButton size="sm" variant="outline" fullWidth>
      {installLabel}
    </CustomButton>
  </Card>
);

export default RecommendedAppCard;
