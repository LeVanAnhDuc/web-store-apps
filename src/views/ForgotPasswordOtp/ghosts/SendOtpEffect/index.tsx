"use client";

// libs
import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
// requests
import { sendForgotPasswordOtp } from "@/requests/forgotPassword";

const SendOtpEffect = ({ email }: { email: string }) => {
  const hasSent = useRef(false);

  const { mutate: sendOtp } = useMutation({
    mutationFn: () => sendForgotPasswordOtp(email)
  });

  useEffect(() => {
    if (hasSent.current) return;
    hasSent.current = true;
    sendOtp();
  }, []);

  return null;
};

export default SendOtpEffect;
