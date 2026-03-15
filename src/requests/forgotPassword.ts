// others
import axiosInstance from "@/libs/axios";

type SendOtpResponse = {
  success: boolean;
  expiresIn: number;
  cooldown: number;
};

type VerifyOtpResponse = {
  success: boolean;
  resetToken: string;
};

type SendMagicLinkResponse = {
  success: boolean;
  expiresIn: number;
  cooldown: number;
};

type VerifyMagicLinkResponse = {
  success: boolean;
  resetToken: string;
};

type ResetPasswordResponse = {
  success: boolean;
};

export const sendForgotPasswordOtp = async (
  email: string
): Promise<SendOtpResponse> => {
  const response = await axiosInstance.post<ResponsePattern<SendOtpResponse>>(
    "/auth/forgot-password/otp/send",
    { email }
  );
  return response.data.data;
};

export const verifyForgotPasswordOtp = async (
  email: string,
  otp: string
): Promise<VerifyOtpResponse> => {
  const response = await axiosInstance.post<ResponsePattern<VerifyOtpResponse>>(
    "/auth/forgot-password/otp/verify",
    { email, otp }
  );
  return response.data.data;
};

export const sendForgotPasswordMagicLink = async (
  email: string
): Promise<SendMagicLinkResponse> => {
  const response = await axiosInstance.post<
    ResponsePattern<SendMagicLinkResponse>
  >("/auth/forgot-password/magic-link/send", { email });
  return response.data.data;
};

export const verifyForgotPasswordMagicLink = async (
  email: string,
  token: string
): Promise<VerifyMagicLinkResponse> => {
  const response = await axiosInstance.post<
    ResponsePattern<VerifyMagicLinkResponse>
  >("/auth/forgot-password/magic-link/verify", { email, token });
  return response.data.data;
};

export const resetPassword = async (
  email: string,
  resetToken: string,
  newPassword: string
): Promise<ResetPasswordResponse> => {
  const response = await axiosInstance.post<
    ResponsePattern<ResetPasswordResponse>
  >("/auth/forgot-password/reset", { email, resetToken, newPassword });
  return response.data.data;
};
