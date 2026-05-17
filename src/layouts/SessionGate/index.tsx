"use client";

// libs
import { useQuery } from "@tanstack/react-query";
// types
import type { PropsWithChildren } from "react";
// components
import LoadingScreen from "@/components/LoadingScreen";
// stores
import { useAuthStore } from "@/stores";
// requests
import { refreshToken } from "@/requests/login";

const SessionGate = ({ children }: PropsWithChildren) => {
  const hasBootstrapped = useAuthStore((state) => state.hasBootstrapped);

  useQuery({
    queryKey: ["session-bootstrap"],
    queryFn: async () => {
      try {
        const data = await refreshToken();
        useAuthStore.getState().setTokens(data);
        return data;
      } finally {
        useAuthStore.getState().setHasBootstrapped(true);
      }
    },
    enabled: !hasBootstrapped,
    retry: false,
    staleTime: Infinity,
    gcTime: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });

  if (!hasBootstrapped) return <LoadingScreen />;

  return <>{children}</>;
};

export default SessionGate;
