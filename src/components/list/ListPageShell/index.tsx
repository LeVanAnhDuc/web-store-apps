// libs
import type { ReactNode } from "react";

const ListPageShell = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col gap-6">{children}</div>
);

export default ListPageShell;
