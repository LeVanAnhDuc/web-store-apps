// types
import type { ContactAdminFormValues } from "@/types/ContactAdmin";
// others
import axiosInstance from "@/libs/axios";

type SubmitContactResponse = {
  ticketNumber: string;
};

export const submitContact = async (
  data: ContactAdminFormValues
): Promise<SubmitContactResponse> => {
  const formData = new FormData();

  if (data.email) formData.append("email", data.email);
  formData.append("subject", data.subject);
  formData.append("category", data.category);
  formData.append("priority", data.priority);
  formData.append("message", data.message);

  const response = await axiosInstance.post<
    ResponsePattern<SubmitContactResponse>
  >("/contact/submit", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

  return response.data.data;
};
