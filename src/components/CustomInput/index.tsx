// libs
import * as React from "react";
// components
import { Input } from "@/components/ui/input";
// others
import { cn } from "@/libs/utils";

type CustomInputProps = React.ComponentProps<"input">;

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, ...props }, ref) => (
    <Input
      ref={ref}
      className={cn(
        "border-input bg-background focus:border-ring focus:ring-ring h-12 rounded-lg px-4 transition-all duration-200",
        className
      )}
      {...props}
    />
  )
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
