// types
import type {
  AdminAppsQueryParams,
  AdminAppCreateInput,
  AdminAppCreateResult,
  WebApp,
  WebAppCategory
} from "@/types/AdminApps";
// others
import axiosInstance from "@/libs/axios";
import CONSTANTS from "@/constants";

const { END_POINTS } = CONSTANTS;

export const getAdminApps = async (
  params: AdminAppsQueryParams = {}
): Promise<{ items: WebApp[] }> => {
  const response = await axiosInstance.get<
    ResponsePattern<{ items: WebApp[] }>
  >(END_POINTS.ADMIN_APPS, { params });
  return response.data.data;
};

export const getAdminAppCategories = async (): Promise<WebAppCategory[]> => {
  const response = await axiosInstance.get<ResponsePattern<WebAppCategory[]>>(
    END_POINTS.ADMIN_APP_CATEGORIES
  );
  return response.data.data;
};

export const createAdminApp = async (
  input: AdminAppCreateInput
): Promise<AdminAppCreateResult> => {
  const response = await axiosInstance.post<
    ResponsePattern<AdminAppCreateResult>
  >(END_POINTS.ADMIN_APPS, input);
  return response.data.data;
};
