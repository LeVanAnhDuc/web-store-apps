// types
import type { StateCreator } from "zustand";
import type { AuthStore, AuthState } from "@/types/stores";
import type { LoginTokenResponse } from "@/types/Login";
// requests
import { logoutUser } from "@/requests/logout";

const initialState: AuthState = {
  tokens: null
};

const createAuthSlice: StateCreator<AuthStore> = (set) => ({
  ...initialState,

  setTokens: (tokens: LoginTokenResponse) => set({ tokens }),

  clearTokens: () => set({ tokens: null }),

  logout: async () => {
    try {
      await logoutUser();
    } finally {
      set({ tokens: null });
    }
  }
});

export default createAuthSlice;
