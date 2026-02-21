// libs
import { getMessages } from "next-intl/server";
import { redirect } from "next/navigation";
import { KeyRound } from "lucide-react";
// types
import type { ForgotPasswordMessages } from "@/types/libs";
// components
import AuthStepLayout from "@/components/AuthStepLayout";
import AuthIcon from "@/components/AuthIcon";
import OptionsForm from "./mains/OptionsForm";
import BackButton from "./components/BackButton";
// others
import CONSTANTS from "@/constants";

const { LOGIN, FORGOT_PASSWORD } = CONSTANTS.ROUTES;

const ForgotPassword = async ({
  searchParams
}: {
  searchParams: Promise<{ email?: string }>;
}) => {
  const { email } = await searchParams;

  if (!email) redirect(LOGIN);

  const decodedEmail = decodeURIComponent(email);
  const encodedEmail = encodeURIComponent(decodedEmail);
  const currentPath = `${FORGOT_PASSWORD}?email=${encodedEmail}`;

  const messages = await getMessages();
  const translations = messages.forgotPassword as ForgotPasswordMessages;
  const { options } = translations.form;

  return (
    <AuthStepLayout
      icon={<AuthIcon Icon={KeyRound} animated />}
      title={options.title}
      email={decodedEmail}
      backButton={<BackButton />}
    >
      <OptionsForm
        email={decodedEmail}
        currentPath={currentPath}
        translations={translations}
      />
    </AuthStepLayout>
  );
};

export default ForgotPassword;
