// libs
import type { ReactNode } from "react";

const Nav = ({
  children,
  "aria-label": ariaLabel
}: {
  children: ReactNode;
  "aria-label"?: string;
}) => (
  <nav className="space-y-1" aria-label={ariaLabel}>
    {children}
  </nav>
);

export default Nav;
