// types
import type { LucideIcon } from "lucide-react";
import type { ColorVariant } from "@/dataSources/Common";
// components
import { FadeSlideLeft } from "@/components/Animated";
// dataSources
import { COLOR_VARIANT_CLASSES } from "@/dataSources/Common";
// others
import { Link } from "@/i18n/navigation";
import { cn } from "@/libs/utils";

const LoginOptionCard = ({
  icon: Icon,
  title,
  description,
  colorVariant,
  href,
  animationDelay = 0
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  colorVariant: ColorVariant;
  href: string;
  animationDelay?: number;
}) => (
  <FadeSlideLeft delay={animationDelay}>
    <Link
      href={href}
      className={cn(
        "group flex w-full items-center gap-4 rounded-xl border-2",
        "border-border p-4 transition-all duration-200",
        "hover:border-primary hover:bg-primary/5"
      )}
    >
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-lg",
          "transition-colors duration-200",
          COLOR_VARIANT_CLASSES[colorVariant]
        )}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex-1 text-left">
        <div className="text-foreground font-medium">{title}</div>
        <div className="text-muted-foreground text-sm">{description}</div>
      </div>
    </Link>
  </FadeSlideLeft>
);

export default LoginOptionCard;
