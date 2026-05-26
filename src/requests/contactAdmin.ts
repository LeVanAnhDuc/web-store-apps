// types
import type {
  AdminContactQuery,
  PaginatedContactsResponse,
  ContactDetailItem,
  ContactStatus
} from "@/types/ContactAdmin";
// others
import axiosInstance from "@/libs/axios";
import CONSTANTS from "@/constants";

const { END_POINTS } = CONSTANTS;

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
