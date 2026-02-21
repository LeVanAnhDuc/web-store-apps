// types
import type { Priority } from "@/dataSources/ContactAdmin";

export interface ContactAdminFormValues {
  email?: string;
  subject: string;
  category: string;
  priority: Priority;
  message: string;
}
