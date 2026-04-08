"use client";

// libs
import { useQuery } from "@tanstack/react-query";
// types
import type { LoginTokenResponse } from "@/types/Login";
// stores
import { useAuthStore } from "@/stores";
// others
import axiosInstance from "@/libs/axios";
import CONSTANTS from "@/constants";

const REFRESH_BUFFER_SECONDS = 60;
const CHECK_INTERVAL_MS = 30_000;

const TokenRefresher = () => {
  const tokens = useAuthStore((state) => state.tokens);

  useQuery({
    queryKey: ["token-refresh"],
    queryFn: async () => {
      const currentTokens = useAuthStore.getState().tokens;
      if (!currentTokens?.accessToken) return null;

      const nowSeconds = Date.now() / 1000;
      if (currentTokens.expiresIn - nowSeconds >= REFRESH_BUFFER_SECONDS)
        return null;

      const res = await axiosInstance.post<ResponsePattern<LoginTokenResponse>>(
        CONSTANTS.END_POINTS.AUTH_REFRESH
      );
      useAuthStore.getState().setTokens(res.data.data);
      return res.data.data;
    },
    enabled: !!tokens,
    refetchInterval: CHECK_INTERVAL_MS,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 0,
    gcTime: 0,
    retry: false
  });

  return null;
};

export default TokenRefresher;
