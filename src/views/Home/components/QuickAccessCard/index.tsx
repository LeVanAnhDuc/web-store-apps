// types
import type { ReactNode } from "react";
// components
import { Button } from "@/components/ui/button";
// others
import { cn } from "@/libs/utils";

const QuickAccessCard = ({
  name,
  lastOpened,
  icon,
  gradient,
  lastOpenedLabel
}: {
  name: string;
  lastOpened: string;
  icon: ReactNode;
  gradient: string;
  lastOpenedLabel: string;
}) => (
  <Button
    type="button"
    variant="ghost"
    size="default"
    aria-label={`${name}, ${lastOpenedLabel.replace("{time}", lastOpened)}`}
    className={cn(
      "flex h-[140px] cursor-pointer flex-col items-start justify-start gap-2.5 rounded-2xl p-5 text-left whitespace-normal transition-opacity hover:opacity-90",
      gradient
    )}
  >
    <div className="flex items-center justify-between">
      <div
        className="bg-primary-foreground/15 flex size-10 items-center justify-center rounded-xl"
        aria-hidden="true"
      >
        {icon}
      </div>
    </div>
    <span
      className="text-primary-foreground text-base font-bold"
      aria-hidden="true"
    >
      {name}
    </span>
    <span className="text-primary-foreground/80 text-[11px]" aria-hidden="true">
      {lastOpenedLabel.replace("{time}", lastOpened)}
    </span>
  </Button>
);

export default QuickAccessCard;
