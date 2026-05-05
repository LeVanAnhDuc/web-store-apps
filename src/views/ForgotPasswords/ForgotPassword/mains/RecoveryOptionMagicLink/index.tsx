"use client";

// libs
import { Mail } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
// components
import RecoveryOptionCardButton from "../../components/RecoveryOptionCardButton";
// hooks
import { useAnnounce } from "@/hooks";
// requests
import { sendForgotPasswordMagicLink } from "@/requests/forgotPassword";
// others
import CONSTANTS from "@/constants";

const { FORGOT_PASSWORD_MAGIC_LINK } = CONSTANTS.ROUTES;

const RecoveryOptionMagicLink = ({
  email,
  title,
  description,
  errorMessage,
  delay
}: {
  email: string;
  title: string;
  description: string;
  errorMessage: string;
  delay?: number;
}) => {
  const tAnnounce = useTranslations("forgotPassword.announce");
  const { announce } = useAnnounce();

  const { mutate: sendMagicLink } = useMutation({
    mutationFn: () => sendForgotPasswordMagicLink(email),
    onMutate: () => announce(tAnnounce("sendingLink")),
    onSuccess: () => announce(tAnnounce("linkSent")),
    onError: () => {
      announce(tAnnounce("linkSendError"));
      toast.error(errorMessage);
    }
  });

  return (
    <RecoveryOptionCardButton
      icon={Mail}
      title={title}
      description={description}
      colorVariant="primary"
      href={`${FORGOT_PASSWORD_MAGIC_LINK}?email=${encodeURIComponent(email)}`}
      animationDelay={delay}
      onSelect={() => sendMagicLink()}
    />
  );
};

export default RecoveryOptionMagicLink;
