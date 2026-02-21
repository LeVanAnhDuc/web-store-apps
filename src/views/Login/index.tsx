// libs
import { getMessages } from "next-intl/server";
import { KeyRound } from "lucide-react";
// types
import type { LoginMessages } from "@/types/libs";
// components
import AuthStepLayout from "@/components/AuthStepLayout";
import AuthIcon from "@/components/AuthIcon";
import AuthDivider from "@/components/AuthDivider";
import SocialAuthenButtons from "@/components/SocialAuthenButtons";
import EmailStepForm from "./mains/EmailStepForm";
import SignUpLink from "./components/SignUpLink";

const Login = async () => {
  const messages = await getMessages();
  const translations = messages.login as LoginMessages;
  const { form, link } = translations;

  return (
    <AuthStepLayout
      icon={<AuthIcon Icon={KeyRound} />}
      title={form.title}
      description={form.description}
    >
      <SocialAuthenButtons
        labels={{
          google: form.button.loginWithGoogle,
          facebook: form.button.loginWithFacebook
        }}
      />
      <AuthDivider />
      <EmailStepForm
        labels={{
          email: form.input.labelEmail,
          next: form.button.next
        }}
      />
      <SignUpLink
        labels={{
          descriptionSignUp: link.descriptionSignUp,
          signUp: link.signUp
        }}
      />
    </AuthStepLayout>
  );
};

export default Login;
