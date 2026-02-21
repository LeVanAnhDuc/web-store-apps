// libs
import { getMessages } from "next-intl/server";
import { redirect } from "next/navigation";
import { Mail } from "lucide-react";
// types
import type { ForgotPasswordMessages } from "@/types/libs";
// components
import AuthStepLayout from "@/components/AuthStepLayout";
import AuthIcon from "@/components/AuthIcon";
import MagicLinkForm from "./mains/MagicLinkForm";
import BackButton from "./components/BackButton";
// others
import CONSTANTS from "@/constants";

const { FORGOT_PASSWORD } = CONSTANTS.ROUTES;

const ForgotPasswordMagicLink = async ({
  searchParams
}: {
  searchParams: Promise<{ email?: string }>;
}) => {
  const { email } = await searchParams;

  if (!email) redirect(FORGOT_PASSWORD);

  const decodedEmail = decodeURIComponent(email);
  const encodedEmail = encodeURIComponent(decodedEmail);
  const tryOtherHref = `${FORGOT_PASSWORD}?email=${encodedEmail}`;

  const messages = await getMessages();
  const translations = messages.forgotPassword as ForgotPasswordMessages;
  const { magicLink } = translations.form;

  return (
    <AuthStepLayout
      icon={<AuthIcon Icon={Mail} animated />}
      title={magicLink.title}
      description={magicLink.description}
      email={decodedEmail}
      backButton={<BackButton email={decodedEmail} />}
    >
      <MagicLinkForm
        email={decodedEmail}
        tryOtherHref={tryOtherHref}
        translations={translations}
      />
    </AuthStepLayout>
  );
};

export default ForgotPasswordMagicLink;
