// types
import type { ReactNode } from "react";
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
  <button
    type="button"
    aria-label={`${name}, ${lastOpenedLabel.replace("{time}", lastOpened)}`}
    className={cn(
      "focus-visible:ring-ring flex h-[140px] cursor-pointer flex-col items-start gap-2.5 rounded-2xl p-5 text-left transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:outline-none",
      gradient
    )}
  >
    <div className="flex items-center justify-between">
      <div
        className="flex size-10 items-center justify-center rounded-xl bg-white/15"
        aria-hidden="true"
      >
        {icon}
      </div>
    </div>
    <span className="text-base font-bold text-white" aria-hidden="true">
      {name}
    </span>
    <span className="text-[11px] text-white/80" aria-hidden="true">
      {lastOpenedLabel.replace("{time}", lastOpened)}
    </span>
  </button>
);

export default QuickAccessCard;
