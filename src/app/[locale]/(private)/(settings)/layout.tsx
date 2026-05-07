// types
import type { ReactNode } from "react";
// components
import SettingsLayout from "@/layouts/SettingsLayout";

export default function Layout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return <SettingsLayout>{children}</SettingsLayout>;
}
