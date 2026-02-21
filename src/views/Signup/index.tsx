// libs
import { getMessages } from "next-intl/server";
import { UserPlus } from "lucide-react";
// types
import type { SignupMessages } from "@/types/libs";
// components
import AuthStepLayout from "@/components/AuthStepLayout";
import AuthIcon from "@/components/AuthIcon";
import AuthDivider from "@/components/AuthDivider";
import SocialAuthenButtons from "@/components/SocialAuthenButtons";
import EmailStepForm from "./mains/EmailStepForm";
import LoginLink from "./components/LoginLink";

const Signup = async () => {
  const messages = await getMessages();
  const translations = messages.signup as SignupMessages;
  const { emailStep, link } = translations;

  return (
    <AuthStepLayout
      icon={<AuthIcon Icon={UserPlus} />}
      title={emailStep.title}
      description={emailStep.description}
    >
      <SocialAuthenButtons
        labels={{
          google: emailStep.button.signupWithGoogle,
          facebook: emailStep.button.signupWithFacebook
        }}
      />
      <AuthDivider />
      <EmailStepForm
        labels={{
          email: emailStep.input.labelEmail,
          next: emailStep.button.next
        }}
      />
      <LoginLink
        labels={{
          description: link.descriptionSignUp,
          login: link.login
        }}
      />
    </AuthStepLayout>
  );
};

export default Signup;
