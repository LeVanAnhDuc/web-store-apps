// types
import type {
  LoginHistoryQueryParams,
  AdminLoginHistoryQueryParams,
  PaginatedLoginHistoryResponse,
  PaginatedAdminLoginHistoryResponse
} from "@/types/LoginHistory";
// others
import axiosInstance from "@/libs/axios";
import CONSTANTS from "@/constants";

const { END_POINTS } = CONSTANTS;

export const getMyLoginHistory = async (
  params?: LoginHistoryQueryParams
): Promise<PaginatedLoginHistoryResponse> => {
  const response = await axiosInstance.get<
    ResponsePattern<PaginatedLoginHistoryResponse>
  >(END_POINTS.LOGIN_HISTORY, { params });
  return response.data.data;
};

export const getAdminLoginHistory = async (
  params?: AdminLoginHistoryQueryParams
): Promise<PaginatedAdminLoginHistoryResponse> => {
  const response = await axiosInstance.get<
    ResponsePattern<PaginatedAdminLoginHistoryResponse>
  >(END_POINTS.ADMIN_LOGIN_HISTORY, { params });
  return response.data.data;
};
