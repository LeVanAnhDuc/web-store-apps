"use client";

// libs
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
// requests
import { sendLoginMagicLink } from "@/requests/login";
// hooks
import { useAnnounce } from "@/hooks";

const SendMagicLinkEffect = ({ email }: { email: string }) => {
  const tAnnounce = useTranslations("login.announce");
  const { announce } = useAnnounce();

  const { mutate: sendMagicLink } = useMutation({
    mutationFn: () => sendLoginMagicLink(email),
    onMutate: () => {
      announce(tAnnounce("sendingLink"));
    },
    onSuccess: () => {
      announce(tAnnounce("linkSent"));
    }
  });

  useEffect(() => {
    sendMagicLink();
  }, [sendMagicLink]);

  return null;
};

export default SendMagicLinkEffect;
