// libs
import { persist, createJSONStorage } from "zustand/middleware";
// types
import type { StateCreator } from "zustand";
import type { ContactAdminState, ContactAdminStore } from "@/types/stores";
import type { ContactAdminFormValues } from "@/types/ContactAdmin";

const initialState: ContactAdminState = {
  formData: null,
  ticketNumber: null,
  referrerPath: null
};

const createContactAdminSlice: StateCreator<
  ContactAdminStore,
  [],
  [["zustand/persist", unknown]]
> = persist(
  (set) => ({
    ...initialState,

    setReferrerPath: (path: string) => set({ referrerPath: path }),

    setSuccessData: (formData: ContactAdminFormValues, ticketNumber: string) =>
      set({ formData, ticketNumber }),

    reset: () => set(initialState)
  }),
  {
    name: "contact-admin-storage",
    storage: createJSONStorage(() => sessionStorage)
  }
);

export default createContactAdminSlice;
