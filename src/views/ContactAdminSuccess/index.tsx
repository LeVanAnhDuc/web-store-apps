// libs
import { getMessages } from "next-intl/server";
// types
import type { ContactAdminMessages } from "@/types/libs";
// components
import AuthStepLayout from "@/components/AuthStepLayout";
import SuccessMain from "./mains/SuccessMain";
import SuccessIcon from "./components/SuccessIcon";

const ContactAdminSuccess = async () => {
  const messages = await getMessages();
  const translations = messages.contactAdmin as ContactAdminMessages;
  const { success, form } = translations;
  const {
    title,
    description,
    ticketInfo,
    nextSteps,
    importantNotes,
    button,
    response
  } = success;
  const { category, priority } = form;

  return (
    <AuthStepLayout
      icon={<SuccessIcon />}
      title={title}
      description={description}
      maxWidth="2xl"
    >
      <SuccessMain
        labels={{
          ticketInfo,
          nextSteps,
          importantNotes,
          button,
          response,
          category,
          priority
        }}
      />
    </AuthStepLayout>
  );
};

export default ContactAdminSuccess;
