// libs
import { getMessages } from "next-intl/server";
import { redirect } from "next/navigation";
import { Mail } from "lucide-react";
// types
import type { LoginMessages } from "@/types/libs";
// components
import AuthStepLayout from "@/components/AuthStepLayout";
import AuthIcon from "@/components/AuthIcon";
import MagicLinkForm from "./mains/MagicLinkForm";
import MagicLinkInstructions from "./components/MagicLinkInstructions";
import BackButton from "./components/BackButton";
// others
import CONSTANTS from "@/constants";

const { LOGIN, LOGIN_ALTERNATIVE } = CONSTANTS.ROUTES;

const LoginMagicLink = async ({
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
  const { magicLink } = translations.form;

  return (
    <AuthStepLayout
      icon={<AuthIcon Icon={Mail} animated />}
      title={magicLink.title}
      description={magicLink.description}
      email={decodedEmail}
      backButton={<BackButton email={decodedEmail} />}
    >
      <MagicLinkInstructions translations={translations} />
      <MagicLinkForm tryOtherHref={tryOtherHref} translations={translations} />
    </AuthStepLayout>
  );
};

export default LoginMagicLink;
