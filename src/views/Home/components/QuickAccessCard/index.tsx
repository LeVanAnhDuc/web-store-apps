"use client";
// types
import type { ReactNode } from "react";
// components
import CustomButton from "@/components/CustomButton";
import CustomImage from "@/components/CustomImage";
// others
import { cn } from "@/libs/utils";

const QuickAccessCard = ({
  name,
  category,
  iconUrl,
  homeUrl,
  gradient
}: {
  name: string;
  category: string | null;
  iconUrl: string | null;
  homeUrl: string;
  gradient: string;
}) => {
  const initial = name.charAt(0).toUpperCase();
  const handleOpen = () => {
    window.open(homeUrl, "_blank", "noopener,noreferrer");
  };
  const icon: ReactNode = iconUrl ? (
    <CustomImage
      src={iconUrl}
      alt=""
      width={40}
      height={40}
      className="size-full object-cover"
    />
  ) : (
    initial
  );
  return (
    <CustomButton
      type="button"
      variant="ghost"
      size="default"
      onClick={handleOpen}
      aria-label={category ? `${name}, ${category}` : name}
      className={cn(
        "flex h-[140px] cursor-pointer flex-col items-start justify-start gap-2.5 rounded-xl p-6 text-left whitespace-normal transition-opacity hover:opacity-90",
        gradient
      )}
    >
      <div
        className="bg-primary-foreground/15 text-primary-foreground flex size-10 items-center justify-center overflow-hidden rounded-xl text-base font-semibold"
        aria-hidden="true"
      >
        {icon}
      </div>
      <span
        className="text-primary-foreground text-base font-bold"
        aria-hidden="true"
      >
        {name}
      </span>
      {category && (
        <span className="text-primary-foreground/80 text-xs" aria-hidden="true">
          {category}
        </span>
      )}
    </CustomButton>
  );
};

export default QuickAccessCard;
