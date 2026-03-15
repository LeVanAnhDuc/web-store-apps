// types
import type { ComponentProps, ReactNode } from "react";
import type { buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
// components
import { Button as ButtonUI } from "@/components/ui/button";
import { Spinner } from "../ui/spinner";
// others
import { cn } from "@/libs/utils";

type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;

const SIZE_TEXT_CLASSES: Record<ButtonSize, string> = {
  sm: "text-xs",
  default: "text-sm",
  lg: "text-base",
  icon: "",
  "icon-sm": "",
  "icon-lg": ""
};

const CustomButton = ({
  className,
  loading,
  variant = "default",
  size = "default",
  fullWidth,
  iconRight,
  iconLeft,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
    iconRight?: ReactNode;
    iconLeft?: ReactNode;
    fullWidth?: boolean;
  }) => (
  <ButtonUI
    className={cn(
      "hover:cursor-pointer",
      SIZE_TEXT_CLASSES[size ?? "default"],
      {
        "w-full": fullWidth
      },
      className
    )}
    disabled={loading || props.disabled}
    variant={variant}
    size={size}
    {...props}
  >
    {loading ? <Spinner /> : iconLeft}
    {props.children}
    {iconRight}
  </ButtonUI>
);

export default CustomButton;
