"use client";

// libs
import { useEffect, useRef } from "react";
// types
import type { LoginTokenResponse } from "@/types/Login";
// stores
import { useAuthStore } from "@/stores";
// others
import axiosInstance from "@/libs/axios";

const REFRESH_BUFFER_SECONDS = 60;
const CHECK_INTERVAL_MS = 30_000;

const TokenRefresher = () => {
  const isRefreshing = useRef(false);

  useEffect(() => {
    const check = async () => {
      const tokens = useAuthStore.getState().tokens;
      if (!tokens?.accessToken || isRefreshing.current) return;

      const nowSeconds = Date.now() / 1000;
      if (tokens.expiresIn - nowSeconds >= REFRESH_BUFFER_SECONDS) return;

      isRefreshing.current = true;
      try {
        const res =
          await axiosInstance.post<ResponsePattern<LoginTokenResponse>>(
            "/auth/refresh"
          );
        useAuthStore.getState().setTokens(res.data.data);
      } catch {
        // refresh failed — do nothing, let the next 401 trigger logout
      } finally {
        isRefreshing.current = false;
      }
    };

    const interval = setInterval(check, CHECK_INTERVAL_MS);
    check();
    return () => clearInterval(interval);
  }, []);

  return null;
};

export default TokenRefresher;
