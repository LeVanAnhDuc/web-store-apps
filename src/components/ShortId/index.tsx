// libs
import { cn } from "@/libs/utils";

const SHORT_ID_LENGTH = 6;

const ShortId = ({
  value,
  className
}: {
  value: string;
  className?: string;
}) => (
  <span className={cn("font-mono", className)} title={value}>
    {value.slice(0, SHORT_ID_LENGTH)}...
  </span>
);

export default ShortId;
