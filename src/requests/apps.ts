// types
import type {
  UserAppsQueryParams,
  PaginatedUserAppsResponse
} from "@/types/Apps";
// others
import axiosInstance from "@/libs/axios";
import CONSTANTS from "@/constants";

const { END_POINTS } = CONSTANTS;

export const getApps = async (
  params?: UserAppsQueryParams
): Promise<PaginatedUserAppsResponse> => {
  const response = await axiosInstance.get<
    ResponsePattern<PaginatedUserAppsResponse>
  >(END_POINTS.APPS, { params });
  return response.data.data;
};
