// types
import type {
  MyProfileResponse,
  PublicProfileResponse,
  UpdateProfileData,
  UploadAvatarResponse
} from "@/types/User";
// others
import axiosInstance from "@/libs/axios";

export const getMyProfile = async (): Promise<MyProfileResponse> => {
  const response =
    await axiosInstance.get<ResponsePattern<MyProfileResponse>>("/users/me");
  return response.data.data;
};

export const updateMyProfile = async (
  data: UpdateProfileData
): Promise<MyProfileResponse> => {
  const response = await axiosInstance.patch<
    ResponsePattern<MyProfileResponse>
  >("/users/me", data);
  return response.data.data;
};

export const uploadAvatar = async (
  file: File
): Promise<UploadAvatarResponse> => {
  const formData = new FormData();
  formData.append("avatar", file);

  const response = await axiosInstance.post<
    ResponsePattern<UploadAvatarResponse>
  >("/users/me/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return response.data.data;
};

export const getPublicProfile = async (
  id: string
): Promise<PublicProfileResponse> => {
  const response = await axiosInstance.get<
    ResponsePattern<PublicProfileResponse>
  >(`/users/${id}`);
  return response.data.data;
};
