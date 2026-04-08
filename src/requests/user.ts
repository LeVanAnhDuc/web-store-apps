// types
import type {
  MyProfileResponse,
  PublicProfileResponse,
  UpdateProfileData,
  UploadAvatarResponse
} from "@/types/User";
// others
import axiosInstance from "@/libs/axios";
import CONSTANTS from "@/constants";

const { END_POINTS } = CONSTANTS;

export const getMyProfile = async (): Promise<MyProfileResponse> => {
  const response = await axiosInstance.get<ResponsePattern<MyProfileResponse>>(
    END_POINTS.USERS_ME
  );
  return response.data.data;
};

export const updateMyProfile = async (
  data: UpdateProfileData
): Promise<MyProfileResponse> => {
  const response = await axiosInstance.patch<
    ResponsePattern<MyProfileResponse>
  >(END_POINTS.USERS_ME, data);
  return response.data.data;
};

export const uploadAvatar = async (
  file: File
): Promise<UploadAvatarResponse> => {
  const formData = new FormData();
  formData.append("avatar", file);

  const response = await axiosInstance.post<
    ResponsePattern<UploadAvatarResponse>
  >(END_POINTS.USERS_ME_AVATAR, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return response.data.data;
};

export const getPublicProfile = async (
  id: string
): Promise<PublicProfileResponse> => {
  const response = await axiosInstance.get<
    ResponsePattern<PublicProfileResponse>
  >(`${END_POINTS.USERS_BY_ID}/${id}`);
  return response.data.data;
};
