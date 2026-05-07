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
  <div
    className={cn(
      "flex h-[140px] cursor-pointer flex-col gap-2.5 rounded-2xl p-5 transition-opacity hover:opacity-90",
      gradient
    )}
  >
    <div className="flex items-center justify-between">
      <div className="flex size-10 items-center justify-center rounded-xl bg-white/15">
        {icon}
      </div>
    </div>
    <span className="text-base font-bold text-white">{name}</span>
    <span className="text-[11px] text-white/80">
      {lastOpenedLabel.replace("{time}", lastOpened)}
    </span>
  </div>
);

export default QuickAccessCard;
