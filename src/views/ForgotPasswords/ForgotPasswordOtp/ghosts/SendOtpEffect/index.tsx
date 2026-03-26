"use client";

// libs
import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
// requests
import { sendForgotPasswordOtp } from "@/requests/forgotPassword";
// hooks
import { useAnnounce } from "@/hooks";

const SendOtpEffect = ({ email }: { email: string }) => {
  const hasSent = useRef(false);
  const tAnnounce = useTranslations("forgotPassword.announce");
  const { announce } = useAnnounce();

  const { mutate: sendOtp } = useMutation({
    mutationFn: () => sendForgotPasswordOtp(email),
    onMutate: () => {
      announce(tAnnounce("sendingCode"));
    },
    onSuccess: () => {
      announce(tAnnounce("codeSent"));
    }
  });

  useEffect(() => {
    if (hasSent.current) return;
    hasSent.current = true;
    sendOtp();
  }, []);

  return null;
};

export default SendOtpEffect;
