// libs
import { getMessages } from "next-intl/server";
import { Headset } from "lucide-react";
// types
import type { ContactAdminMessages } from "@/types/libs";
// components
import AuthStepLayout from "@/components/AuthStepLayout";
import AuthIcon from "@/components/AuthIcon";
import ResponseTimeAlert from "./mains/ResponseTimeAlert";
import FooterNote from "./mains/FooterNote";
import ContactAdminForm from "./mains/ContactAdminForm";
import BackButton from "./components/BackButton";
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
  const {
    title,
    description,
    responseTime,
    input,
    category,
    priority,
    button,
    hint,
    footerNote
  } = form;

  return (
    <AuthStepLayout
      icon={<AuthIcon Icon={Headset} animated />}
      title={title}
      description={description}
      maxWidth="2xl"
      backButton={<BackButton referrerPath={from} />}
      ghostComponents={<SetReferrerPathEffect referrerPath={from} />}
    >
      <ResponseTimeAlert labels={responseTime} />

      <ContactAdminForm
        initialEmail={decodedEmail}
        labels={{ input, category, priority, button, hint }}
      />

      <FooterNote label={footerNote} />
    </AuthStepLayout>
  );
};

export default ContactAdmin;
