// types
import type { ComponentProps, ReactNode } from "react";
import type { buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
// components
import { Button as ButtonUI } from "@/components/ui/button";
import { Spinner } from "../ui/spinner";
// dataSources
import { BUTTON_SIZE_TEXT_CLASSES } from "@/dataSources/Common";
// others
import { cn } from "@/libs/utils";

const CustomButton = ({
  className,
  loading,
  variant = "default",
  size = "lg",
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
      BUTTON_SIZE_TEXT_CLASSES[size ?? "lg"],
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
