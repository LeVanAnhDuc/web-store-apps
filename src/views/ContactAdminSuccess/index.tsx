// libs
import { getMessages } from "next-intl/server";
// types
import type { ContactAdminMessages } from "@/types/libs";
// components
import AuthStepLayout from "@/components/AuthStepLayout";
import SuccessMain from "./mains/SuccessMain";

const ContactAdminSuccess = async () => {
  const messages = await getMessages();
  const translations = messages.contactAdmin as ContactAdminMessages;
  const { success } = translations;
  const { title, ticketInfo, nextSteps, importantNotes, button } = success;

  return (
    <AuthStepLayout title={title} maxWidth="2xl">
      <SuccessMain
        labels={{
          ticketInfo,
          nextSteps,
          importantNotes,
          button
        }}
      />
    </AuthStepLayout>
  );
};

export default ContactAdminSuccess;
