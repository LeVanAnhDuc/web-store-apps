// libs
import type { ReactNode } from "react";

const ListTableCard = ({ children }: { children: ReactNode }) => (
  <div className="bg-card [&_thead_th]:bg-card overflow-hidden rounded-xl border md:flex md:min-h-0 md:flex-1 md:flex-col md:[&_thead_th]:sticky md:[&_thead_th]:top-0 md:[&_thead_th]:z-10">
    {children}
  </div>
);

export default ListTableCard;
