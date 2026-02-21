// types
import type { ReactNode } from "react";
// components
import Header from "@/components/Header";
import AuthFooter from "@/components/AuthFooter";

export default function ContactAdminLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="auth-background flex min-h-screen flex-col items-center justify-center p-4 pt-20">
        {children}
        <AuthFooter />
      </main>
    </>
  );
}
