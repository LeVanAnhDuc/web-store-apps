// libs
import { getMessages } from "next-intl/server";
import { redirect } from "next/navigation";
import { UserCircle } from "lucide-react";
// types
import type { SignupMessages } from "@/types/libs";
// components
import AuthStepLayout from "@/components/AuthStepLayout";
import AuthIcon from "@/components/AuthIcon";
import InfoStepForm from "./mains/InfoStepForm";
import BackButton from "./components/BackButton";
// others
import CONSTANTS from "@/constants";

const { SIGNUP } = CONSTANTS.ROUTES;

const SignupInfo = async ({
  searchParams
}: {
  searchParams: Promise<{ email?: string }>;
}) => {
  const { email } = await searchParams;

  if (!email) redirect(SIGNUP);

  const decodedEmail = decodeURIComponent(email);
  const messages = await getMessages();
  const translations = messages.signup as SignupMessages;

  return (
    <AuthStepLayout
      icon={<AuthIcon Icon={UserCircle} />}
      title={translations.infoStep.title}
      email={decodedEmail}
      backButton={<BackButton />}
    >
      <InfoStepForm translations={translations} />
    </AuthStepLayout>
  );
};

export default SignupInfo;
