// types
import type {
  LoginHistoryQueryParams,
  AdminLoginHistoryQueryParams,
  PaginatedLoginHistoryResponse,
  PaginatedAdminLoginHistoryResponse
} from "@/types/LoginHistory";
// others
import axiosInstance from "@/libs/axios";

export const getMyLoginHistory = async (
  params?: LoginHistoryQueryParams
): Promise<PaginatedLoginHistoryResponse> => {
  const response = await axiosInstance.get<
    ResponsePattern<PaginatedLoginHistoryResponse>
  >("/login-history", { params });
  return response.data.data;
};

export const getAdminLoginHistory = async (
  params?: AdminLoginHistoryQueryParams
): Promise<PaginatedAdminLoginHistoryResponse> => {
  const response = await axiosInstance.get<
    ResponsePattern<PaginatedAdminLoginHistoryResponse>
  >("/admin/login-history", { params });
  return response.data.data;
};
