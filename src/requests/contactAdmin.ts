// types
import type {
  ContactAdminFormValues,
  AdminContactQuery,
  MyContactsQuery,
  PaginatedContactsResponse,
  PaginatedUserContactsResponse,
  ContactDetailItem,
  ContactStatus,
  ContactCategory
} from "@/types/ContactAdmin";
// others
import axiosInstance from "@/libs/axios";
import CONSTANTS from "@/constants";

const { END_POINTS } = CONSTANTS;

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
  formData.append("message", data.message);
  files?.forEach((file) => formData.append("attachments", file));

  const response = await axiosInstance.post<
    ResponsePattern<SubmitContactResponse>
  >(END_POINTS.CONTACT_SUBMIT, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

  return response.data.data;
};

// ─── v2.0 ─────────────────────────────────────────────────────────────────────

export const getAdminContact = async (
  params?: AdminContactQuery
): Promise<PaginatedContactsResponse> => {
  const response = await axiosInstance.get<
    ResponsePattern<PaginatedContactsResponse>
  >(END_POINTS.ADMIN_CONTACTS, { params });
  return response.data.data;
};

export const getAdminContactDetail = async (
  id: string
): Promise<ContactDetailItem> => {
  const response = await axiosInstance.get<ResponsePattern<ContactDetailItem>>(
    `${END_POINTS.ADMIN_CONTACTS}/${id}`
  );
  return response.data.data;
};

export const updateContactStatus = async (
  id: string,
  status: ContactStatus
): Promise<void> => {
  await axiosInstance.patch(`${END_POINTS.ADMIN_CONTACTS}/${id}/status`, {
    status
  });
};

export const updateContactCategory = async (
  id: string,
  category: ContactCategory
): Promise<void> => {
  await axiosInstance.patch(`${END_POINTS.ADMIN_CONTACTS}/${id}/category`, {
    category
  });
};

export const getMyContacts = async (
  params?: MyContactsQuery
): Promise<PaginatedUserContactsResponse> => {
  const response = await axiosInstance.get<
    ResponsePattern<PaginatedUserContactsResponse>
  >(END_POINTS.AUTH_CONTACTS_ME, { params });
  return response.data.data;
};
