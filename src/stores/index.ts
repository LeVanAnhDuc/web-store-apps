// libs
import { create } from "zustand";
// types
import type { ContactAdminStore } from "@/types/stores";
import type { AuthStore } from "@/types/stores";
// slices
import createContactAdminSlice from "./slices/contactAdmin";
import createAuthSlice from "./slices/auth";

export const useContactAdminStore = create<ContactAdminStore>()((...props) => ({
  ...createContactAdminSlice(...props)
}));

export const useAuthStore = create<AuthStore>()((...props) => ({
  ...createAuthSlice(...props)
}));
