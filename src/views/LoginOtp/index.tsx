// libs
import { getMessages } from "next-intl/server";
import { redirect } from "next/navigation";
import { Lock } from "lucide-react";
// types
import type { LoginMessages } from "@/types/libs";
// components
import AuthStepLayout from "@/components/AuthStepLayout";
import AuthIcon from "@/components/AuthIcon";
import OtpStepForm from "./mains/OtpStepForm";
import BackButton from "./components/BackButton";
// others
import CONSTANTS from "@/constants";

const { LOGIN, LOGIN_ALTERNATIVE } = CONSTANTS.ROUTES;

const LoginOtp = async ({
  searchParams
}: {
  searchParams: Promise<{ email?: string }>;
}) => {
  const { email } = await searchParams;

  if (!email) {
    redirect(LOGIN);
  }

  const decodedEmail = decodeURIComponent(email);
  const encodedEmail = encodeURIComponent(decodedEmail);
  const tryOtherHref = `${LOGIN_ALTERNATIVE}?email=${encodedEmail}`;

  const messages = await getMessages();
  const translations = messages.login as LoginMessages;
  const { form } = translations;
  const { otp } = form;

  return (
    <AuthStepLayout
      icon={<AuthIcon Icon={Lock} animated />}
      title={otp.title}
      description={otp.description}
      email={decodedEmail}
      backButton={<BackButton email={decodedEmail} />}
    >
      <OtpStepForm tryOtherHref={tryOtherHref} translations={translations} />
    </AuthStepLayout>
  );
};

export default LoginOtp;
