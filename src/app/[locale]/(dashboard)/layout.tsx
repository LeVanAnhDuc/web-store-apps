// types
import type { ReactNode } from "react";
// layouts
import DashboardLayout from "@/layouts/DashboardLayout";

export default function Layout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
