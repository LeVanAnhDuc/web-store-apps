// types
import type { StateCreator } from "zustand";
import type { AuthStore, AuthState } from "@/types/stores";
import type { LoginTokenResponse } from "@/types/Login";

const initialState: AuthState = {
  tokens: null
};

const createAuthSlice: StateCreator<AuthStore> = (set) => ({
  ...initialState,

  setTokens: (tokens: LoginTokenResponse) => set({ tokens }),

  clearTokens: () => set({ tokens: null })
});

export default createAuthSlice;
