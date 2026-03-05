// types
import type {
  LoginTokenResponse,
  SendOtpResponse,
  SendMagicLinkResponse
} from "@/types/Login";
// others
import axiosInstance from "@/libs/axios";

export const loginWithPassword = async (
  email: string,
  password: string
): Promise<LoginTokenResponse> => {
  const response = await axiosInstance.post<
    ResponsePattern<LoginTokenResponse>
  >("/auth/login", { email, password });
  return response.data.data;
};

export const sendLoginOtp = async (email: string): Promise<SendOtpResponse> => {
  const response = await axiosInstance.post<ResponsePattern<SendOtpResponse>>(
    "/auth/login/otp/send",
    { email }
  );
  return response.data.data;
};

export const verifyLoginOtp = async (
  email: string,
  otp: string
): Promise<LoginTokenResponse> => {
  const response = await axiosInstance.post<
    ResponsePattern<LoginTokenResponse>
  >("/auth/login/otp/verify", { email, otp });
  return response.data.data;
};

export const sendLoginMagicLink = async (
  email: string
): Promise<SendMagicLinkResponse> => {
  const response = await axiosInstance.post<
    ResponsePattern<SendMagicLinkResponse>
  >("/auth/login/magic-link/send", { email });
  return response.data.data;
};

export const verifyLoginMagicLink = async (
  email: string,
  token: string
): Promise<LoginTokenResponse> => {
  const response = await axiosInstance.post<
    ResponsePattern<LoginTokenResponse>
  >("/auth/login/magic-link/verify", { email, token });
  return response.data.data;
};
