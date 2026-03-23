export type GenderEnum = "male" | "female" | "other" | "prefer_not_to_say";

export type MyProfileResponse = {
  _id: string;
  fullName: string;
  phone: string | null;
  avatar: string | null;
  address: string | null;
  dateOfBirth: string | null;
  gender: GenderEnum | null;
  email: string;
  createdAt: string;
};

export type PublicProfileResponse = {
  _id: string;
  fullName: string;
  avatar: string | null;
  gender: GenderEnum | null;
};

export type UpdateProfileData = {
  fullName?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: GenderEnum;
};

export type UploadAvatarResponse = {
  avatarUrl: string;
};
