"use client";

// libs
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
// requests
import { sendForgotPasswordMagicLink } from "@/requests/forgotPassword";

const SendMagicLinkEffect = ({ email }: { email: string }) => {
  const { mutate: sendMagicLink } = useMutation({
    mutationFn: () => sendForgotPasswordMagicLink(email)
  });

  useEffect(() => {
    sendMagicLink();
  }, []);

  return null;
};

export default SendMagicLinkEffect;
