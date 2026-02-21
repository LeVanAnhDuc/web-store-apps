// libs
import { getMessages } from "next-intl/server";
import { redirect } from "next/navigation";
import { KeyRound } from "lucide-react";
// types
import type { ResetPasswordMessages } from "@/types/libs";
// components
import AuthStepLayout from "@/components/AuthStepLayout";
import AuthIcon from "@/components/AuthIcon";
import ResetPasswordForm from "./mains/ResetPasswordForm";
// others
import CONSTANTS from "@/constants";

const { LOGIN } = CONSTANTS.ROUTES;

const ResetPassword = async ({
  searchParams
}: {
  searchParams: Promise<{ email?: string; token?: string }>;
}) => {
  const { email, token } = await searchParams;

  // Security: Redirect if missing email or token
  if (!email || !token) redirect(LOGIN);

  const decodedEmail = decodeURIComponent(email);
  const decodedToken = decodeURIComponent(token);

  const messages = await getMessages();
  const translations = messages.resetPassword as ResetPasswordMessages;

  return (
    <AuthStepLayout
      icon={<AuthIcon Icon={KeyRound} animated />}
      title={translations.form.title}
      description={translations.form.description}
      email={decodedEmail}
    >
      <ResetPasswordForm
        email={decodedEmail}
        token={decodedToken}
        translations={translations}
      />
    </AuthStepLayout>
  );
};

export default ResetPassword;
