// types
import type { ContactAdminFormValues } from "@/types/ContactAdmin";

export const initialContactAdminData: ContactAdminFormValues = {
  email: "",
  subject: "",
  category: "",
  priority: "medium",
  message: ""
};
