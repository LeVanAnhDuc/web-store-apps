"use client";

// libs
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
// requests
import { sendLoginOtp } from "@/requests/login";

const SendOtpEffect = ({ email }: { email: string }) => {
  const { mutate: sendOtp } = useMutation({
    mutationFn: () => sendLoginOtp(email)
  });

  useEffect(() => {
    sendOtp();
  }, []);

  return null;
};

export default SendOtpEffect;
