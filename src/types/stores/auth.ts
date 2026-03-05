import type { LoginTokenResponse } from "@/types/Login";

export type AuthState = {
  tokens: LoginTokenResponse | null;
};

export type AuthActions = {
  setTokens: (tokens: LoginTokenResponse) => void;
  clearTokens: () => void;
};

export type AuthStore = AuthState & AuthActions;
