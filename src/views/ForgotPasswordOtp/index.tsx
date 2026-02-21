// libs
import { getMessages } from "next-intl/server";
import { redirect } from "next/navigation";
import { Lock } from "lucide-react";
// types
import type { ForgotPasswordMessages } from "@/types/libs";
// components
import AuthStepLayout from "@/components/AuthStepLayout";
import AuthIcon from "@/components/AuthIcon";
import OtpStepForm from "./mains/OtpStepForm";
import BackButton from "./components/BackButton";
// others
import CONSTANTS from "@/constants";

const { FORGOT_PASSWORD } = CONSTANTS.ROUTES;

const ForgotPasswordOtp = async ({
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
  const { otp } = translations.form;

  return (
    <AuthStepLayout
      icon={<AuthIcon Icon={Lock} animated />}
      title={otp.title}
      description={otp.description}
      email={decodedEmail}
      backButton={<BackButton email={decodedEmail} />}
    >
      <OtpStepForm
        email={decodedEmail}
        tryOtherHref={tryOtherHref}
        translations={translations}
      />
    </AuthStepLayout>
  );
};

export default ForgotPasswordOtp;
