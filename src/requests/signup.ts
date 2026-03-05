// types
import type {
  SendSignupOtpResponse,
  VerifySignupOtpResponse,
  ResendSignupOtpResponse,
  SignupCompletePayload,
  SignupCompleteResponse,
  CheckEmailResponse
} from "@/types/Signup";
// others
import axiosInstance from "@/libs/axios";

export const sendSignupOtp = async (
  email: string
): Promise<SendSignupOtpResponse> => {
  const response = await axiosInstance.post<
    ResponsePattern<SendSignupOtpResponse>
  >("/auth/signup/send-otp", { email });
  return response.data.data;
};

export const verifySignupOtp = async (
  email: string,
  otp: string
): Promise<VerifySignupOtpResponse> => {
  const response = await axiosInstance.post<
    ResponsePattern<VerifySignupOtpResponse>
  >("/auth/signup/verify-otp", { email, otp });
  return response.data.data;
};

export const resendSignupOtp = async (
  email: string
): Promise<ResendSignupOtpResponse> => {
  const response = await axiosInstance.post<
    ResponsePattern<ResendSignupOtpResponse>
  >("/auth/signup/resend-otp", { email });
  return response.data.data;
};

export const completeSignup = async (
  payload: SignupCompletePayload
): Promise<SignupCompleteResponse> => {
  const response = await axiosInstance.post<
    ResponsePattern<SignupCompleteResponse>
  >("/auth/signup/complete", payload);
  return response.data.data;
};

export const checkEmailAvailability = async (
  email: string
): Promise<CheckEmailResponse> => {
  const response = await axiosInstance.get<ResponsePattern<CheckEmailResponse>>(
    `/auth/signup/check-email/${encodeURIComponent(email)}`
  );
  return response.data.data;
};
