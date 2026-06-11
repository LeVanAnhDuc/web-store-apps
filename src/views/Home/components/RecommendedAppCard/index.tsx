"use client";
// libs
import { ArrowUpRight } from "lucide-react";
// components
import { Card } from "@/components/ui/card";
import CustomButton from "@/components/CustomButton";
import CustomImage from "@/components/CustomImage";
// others
import { cn } from "@/libs/utils";

const RecommendedAppCard = ({
  name,
  category,
  iconUrl,
  homeUrl,
  gradient,
  openLabel
}: {
  name: string;
  category: string | null;
  iconUrl: string | null;
  homeUrl: string;
  gradient: string;
  openLabel: string;
}) => {
  const initial = name.charAt(0).toUpperCase();
  const handleOpen = () => {
    window.open(homeUrl, "_blank", "noopener,noreferrer");
  };
  return (
    <Card
      className="flex flex-col gap-4 rounded-xl border p-6"
      aria-labelledby={`rec-${name}-title`}
    >
      <div
        className={cn(
          "flex h-24 items-center justify-center overflow-hidden rounded-xl text-2xl font-semibold",
          gradient
        )}
        aria-hidden="true"
      >
        {iconUrl ? (
          <CustomImage
            src={iconUrl}
            alt=""
            width={56}
            height={56}
            className="size-14 object-cover"
          />
        ) : (
          initial
        )}
      </div>
      <div className="flex flex-col gap-1">
        <h3
          id={`rec-${name}-title`}
          className="text-foreground text-base font-semibold"
        >
          {name}
        </h3>
        {category && (
          <span className="text-muted-foreground text-xs">{category}</span>
        )}
      </div>
      <CustomButton
        size="sm"
        variant="outline"
        fullWidth
        onClick={handleOpen}
        iconRight={<ArrowUpRight className="size-3.5" aria-hidden="true" />}
        aria-label={`${openLabel} ${name}`}
      >
        {openLabel}
      </CustomButton>
    </Card>
  );
};

export default RecommendedAppCard;
