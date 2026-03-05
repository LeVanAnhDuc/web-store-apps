"use client";

// libs
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
// requests
import { sendForgotPasswordOtp } from "@/requests/forgotPassword";

const SendOtpEffect = ({ email }: { email: string }) => {
  const { mutate: sendOtp } = useMutation({
    mutationFn: () => sendForgotPasswordOtp(email)
  });

  useEffect(() => {
    sendOtp();
  }, [sendOtp]);

  return null;
};

export default SendOtpEffect;
