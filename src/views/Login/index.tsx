// libs
import { getMessages } from "next-intl/server";
// types
import type { LoginMessages } from "@/types/libs";
// components
import AuthStepLayout from "@/components/AuthStepLayout";
import AuthDivider from "@/components/AuthDivider";
import SocialAuthenButtons from "@/components/SocialAuthenButtons";
import EmailStepForm from "./mains/EmailStepForm";

const Login = async () => {
  const messages = await getMessages();
  const translations = messages.login as LoginMessages;
  const { form } = translations;

  return (
    <AuthStepLayout>
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
    </AuthStepLayout>
  );
};

export default Login;
