// libs
import type { ReactNode } from "react";
// others
import { cn } from "@/libs/utils";

const ListPageShell = ({
  fullHeight = false,
  children
}: {
  fullHeight?: boolean;
  children: ReactNode;
}) => (
  <div
    className={cn("flex flex-col gap-6", fullHeight && "md:h-full md:min-h-0")}
  >
    {children}
  </div>
);

export default ListPageShell;
