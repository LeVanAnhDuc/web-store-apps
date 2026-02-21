// libs
import { getMessages } from "next-intl/server";
import { redirect } from "next/navigation";
import { KeyRound } from "lucide-react";
// types
import type { LoginMessages } from "@/types/libs";
// components
import AuthStepLayout from "@/components/AuthStepLayout";
import AuthIcon from "@/components/AuthIcon";
import PasswordStepForm from "./mains/PasswordStepForm";
import BackButton from "./components/BackButton";
// others
import CONSTANTS from "@/constants";

const { LOGIN } = CONSTANTS.ROUTES;

const LoginPassword = async ({
  searchParams
}: {
  searchParams: Promise<{ email?: string }>;
}) => {
  const { email } = await searchParams;

  if (!email) redirect(LOGIN);

  const decodedEmail = decodeURIComponent(email);
  const messages = await getMessages();
  const translations = messages.login as LoginMessages;

  return (
    <AuthStepLayout
      icon={<AuthIcon Icon={KeyRound} />}
      title={translations.form.titleWelcome}
      email={decodedEmail}
      backButton={<BackButton />}
    >
      <PasswordStepForm email={decodedEmail} translations={translations} />
    </AuthStepLayout>
  );
};

export default LoginPassword;
