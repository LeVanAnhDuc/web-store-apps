// types
import type {
  ContactAdminFormValues,
  AdminContactsQuery,
  MyContactsQuery,
  PaginatedContactsResponse,
  PaginatedUserContactsResponse,
  ContactDetailItem,
  ContactStatus
} from "@/types/ContactAdmin";
// others
import axiosInstance from "@/libs/axios";

type SubmitContactResponse = {
  ticketNumber: string;
};

export const submitContact = async (
  data: ContactAdminFormValues,
  files?: File[]
): Promise<SubmitContactResponse> => {
  const formData = new FormData();

  if (data.email) formData.append("email", data.email);
  formData.append("subject", data.subject);
  formData.append("category", data.category);
  formData.append("message", data.message);
  files?.forEach((file) => formData.append("attachments", file));

  const response = await axiosInstance.post<
    ResponsePattern<SubmitContactResponse>
  >("/contact/submit", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

  return response.data.data;
};

// ─── v2.0 ─────────────────────────────────────────────────────────────────────

export const getAdminContacts = async (
  params?: AdminContactsQuery
): Promise<PaginatedContactsResponse> => {
  const response = await axiosInstance.get<
    ResponsePattern<PaginatedContactsResponse>
  >("/admin/contacts", { params });
  return response.data.data;
};

export const getAdminContactDetail = async (
  id: string
): Promise<ContactDetailItem> => {
  const response = await axiosInstance.get<ResponsePattern<ContactDetailItem>>(
    `/admin/contacts/${id}`
  );
  return response.data.data;
};

export const updateContactStatus = async (
  id: string,
  status: ContactStatus
): Promise<void> => {
  await axiosInstance.patch(`/admin/contacts/${id}/status`, { status });
};

export const getMyContacts = async (
  params?: MyContactsQuery
): Promise<PaginatedUserContactsResponse> => {
  const response = await axiosInstance.get<
    ResponsePattern<PaginatedUserContactsResponse>
  >("/auth/contacts/me", { params });
  return response.data.data;
};
