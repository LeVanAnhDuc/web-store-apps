// libs
import { getMessages } from "next-intl/server";
// types
import type { ContactAdminMessages } from "@/types/libs";
// components
import AuthStepLayout from "@/components/AuthStepLayout";
import ResponseTimeAlert from "./mains/ResponseTimeAlert";
import ContactAdminForm from "./mains/ContactAdminForm";
// ghosts
import SetReferrerPathEffect from "./ghosts/SetReferrerPathEffect";

const ContactAdmin = async ({
  searchParams
}: {
  searchParams: Promise<{ email?: string; from?: string }>;
}) => {
  const { email, from } = await searchParams;
  const decodedEmail = email ? decodeURIComponent(email) : undefined;

  const messages = await getMessages();
  const translations = messages.contactAdmin as ContactAdminMessages;
  const { form } = translations;
  const { title, responseTime, input, button, hint } = form;

  return (
    <AuthStepLayout
      title={title}
      maxWidth="2xl"
      ghostComponents={<SetReferrerPathEffect referrerPath={from} />}
    >
      <ResponseTimeAlert labels={responseTime} />

      <ContactAdminForm
        initialEmail={decodedEmail}
        labels={{ input, button, hint }}
      />
    </AuthStepLayout>
  );
};

export default ContactAdmin;
