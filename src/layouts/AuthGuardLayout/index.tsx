"use client";

// libs
import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
// types
import type { ReactNode } from "react";
// stores
import { useAuthStore } from "@/stores";
// others
import CONSTANTS from "@/constants";

const { LOGIN } = CONSTANTS.ROUTES;

const AuthGuardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const tokens = useAuthStore((state) => state.tokens);

  useEffect(() => {
    if (!tokens) {
      router.replace(LOGIN);
    }
  }, [tokens, router]);

  if (!tokens) return null;

  return <>{children}</>;
};

export default AuthGuardLayout;
