// types
import type { ReactNode } from "react";
// components
import AuthGuardLayout from "@/layouts/AuthGuardLayout";

export default function PrivateLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return <AuthGuardLayout>{children}</AuthGuardLayout>;
}
