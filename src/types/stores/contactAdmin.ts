// types
import type { ContactAdminFormValues } from "@/types/ContactAdmin";

export interface ContactAdminState {
  formData: ContactAdminFormValues | null;
  ticketNumber: string | null;
  referrerPath: string | null;
}

export interface ContactAdminActions {
  setReferrerPath: (path: string) => void;
  setSuccessData: (
    formData: ContactAdminFormValues,
    ticketNumber: string
  ) => void;
  reset: () => void;
}

export type ContactAdminStore = ContactAdminState & ContactAdminActions;
