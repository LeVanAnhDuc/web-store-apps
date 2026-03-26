"use client";

// libs
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
// requests
import { sendLoginMagicLink } from "@/requests/login";

const SendMagicLinkEffect = ({ email }: { email: string }) => {
  const { mutate: sendMagicLink } = useMutation({
    mutationFn: () => sendLoginMagicLink(email)
  });

  useEffect(() => {
    sendMagicLink();
  }, [sendMagicLink]);

  return null;
};

export default SendMagicLinkEffect;
