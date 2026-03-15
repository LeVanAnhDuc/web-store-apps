// types
import type { ReactNode } from "react";
// components
import PublicLayout from "@/layouts/PublicLayout";

export default function Layout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return <PublicLayout>{children}</PublicLayout>;
}
