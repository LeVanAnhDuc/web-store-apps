// libs
import * as React from "react";
// components
import { SelectTrigger } from "@/components/ui/select";
// others
import { cn } from "@/libs/utils";

type CustomSelectTriggerProps = React.ComponentProps<typeof SelectTrigger>;

const CustomSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectTrigger>,
  CustomSelectTriggerProps
>(({ className, children, ...props }, ref) => (
  <SelectTrigger ref={ref} className={cn("!h-12 w-full", className)} {...props}>
    {children}
  </SelectTrigger>
));

CustomSelectTrigger.displayName = "CustomSelectTrigger";

export default CustomSelectTrigger;
