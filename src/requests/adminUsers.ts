// types
import type {
  AdminUsersQueryParams,
  PaginatedAdminUsersResponse
} from "@/types/AdminUsers";
// others
import axiosInstance from "@/libs/axios";
import CONSTANTS from "@/constants";

const { END_POINTS } = CONSTANTS;

export const getAdminUsers = async (
  params: AdminUsersQueryParams = {}
): Promise<PaginatedAdminUsersResponse> => {
  const response = await axiosInstance.get<
    ResponsePattern<PaginatedAdminUsersResponse>
  >(END_POINTS.ADMIN_USERS, { params });
  return response.data.data;
};
