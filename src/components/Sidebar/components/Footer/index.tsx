// libs
import type { ReactNode } from "react";

const Footer = ({ children }: { children: ReactNode }) => (
  <div className="border-border border-t p-3">{children}</div>
);

export default Footer;
