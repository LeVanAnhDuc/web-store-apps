// libs
import { create } from "zustand";
// types
import type { ContactAdminStore } from "@/types/stores";
// slices
import createContactAdminSlice from "./slices/contactAdmin";

export const useContactAdminStore = create<ContactAdminStore>()((...props) => ({
  ...createContactAdminSlice(...props)
}));
