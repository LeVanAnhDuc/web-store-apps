// types
import type { LucideIcon } from "lucide-react";
import type { ColorVariant } from "@/dataSources/Common";
// components
import CardContent from "./CardContent";
import { FadeSlideLeft } from "@/components/Animated";
// others
import { Link } from "@/i18n/navigation";
import { cn } from "@/libs/utils";

const RecoveryOptionCard = ({
  icon,
  title,
  description,
  colorVariant,
  href,
  animationDelay = 0,
  disabled = false,
  unavailableLabel
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  colorVariant: ColorVariant;
  href?: string;
  animationDelay?: number;
  disabled?: boolean;
  unavailableLabel?: string;
}) => {
  const cardClassName = cn(
    "group flex w-full items-center gap-4 rounded-xl border-2 p-4",
    "transition-all duration-200",
    disabled
      ? "cursor-not-allowed border-border bg-muted opacity-60"
      : "border-border hover:border-primary hover:bg-primary/5"
  );

  const contentProps = {
    icon,
    title,
    description,
    colorVariant,
    disabled,
    unavailableLabel
  };

  if (disabled || !href) {
    return (
      <FadeSlideLeft
        delay={animationDelay}
        aria-label={disabled ? `${title} - ${unavailableLabel}` : title}
        aria-disabled={disabled}
        className={cardClassName}
      >
        <CardContent {...contentProps} />
      </FadeSlideLeft>
    );
  }

  return (
    <FadeSlideLeft delay={animationDelay}>
      <Link href={href} className={cardClassName}>
        <CardContent {...contentProps} />
      </Link>
    </FadeSlideLeft>
  );
};

export default RecoveryOptionCard;
