"use client";

// libs
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
// requests
import { sendLoginOtp } from "@/requests/login";
// hooks
import { useAnnounce } from "@/hooks";

const SendOtpEffect = ({ email }: { email: string }) => {
  const tAnnounce = useTranslations("login.announce");
  const { announce } = useAnnounce();

  const { mutate: sendOtp } = useMutation({
    mutationFn: () => sendLoginOtp(email),
    onMutate: () => {
      announce(tAnnounce("sendingCode"));
    },
    onSuccess: () => {
      announce(tAnnounce("codeSent"));
    }
  });

  useEffect(() => {
    sendOtp();
  }, [sendOtp]);

  return null;
};

export default SendOtpEffect;
