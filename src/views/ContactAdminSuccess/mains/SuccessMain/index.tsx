"use client";

// libs
import { useShallow } from "zustand/react/shallow";
// types
import type { ContactAdminMessages } from "@/types/libs";
// components
import TicketInfo from "../../components/TicketInfo";
import NextSteps from "../../components/NextSteps";
import ImportantNotes from "../../components/ImportantNotes";
import BackButton from "../../components/BackButton";
import PrintButton from "../../components/PrintButton";
import { FadeSlideUp } from "@/components/Animated";
// ghosts
import RedirectGuardEffect from "../../ghosts/RedirectGuardEffect";
// stores
import { useContactAdminStore } from "@/stores";
// others
import { useRouter } from "@/i18n/navigation";

const SuccessMain = ({
  labels
}: {
  labels: Pick<
    ContactAdminMessages["success"],
    "ticketInfo" | "nextSteps" | "importantNotes" | "button"
  >;
}) => {
  const router = useRouter();
  const { ticketInfo, nextSteps, importantNotes, button } = labels;
  const { back, print } = button;

  const { formData, referrerPath, ticketNumber, reset } = useContactAdminStore(
    useShallow((state) => ({
      formData: state.formData,
      ticketNumber: state.ticketNumber,
      referrerPath: state.referrerPath,
      reset: state.reset
    }))
  );

  const handleBack = () => {
    router.push(referrerPath || "/");
    reset();
  };

  return (
    <>
      <TicketInfo
        ticketNumber={ticketNumber}
        formData={formData}
        labels={ticketInfo}
      />

      <NextSteps labels={nextSteps} />

      <ImportantNotes ticketNumber={ticketNumber} labels={importantNotes} />

      <FadeSlideUp delay={1} className="flex flex-col gap-3 sm:flex-row">
        <BackButton label={back} onClick={handleBack} />
        <PrintButton label={print} />
      </FadeSlideUp>

      <RedirectGuardEffect formData={formData} ticketNumber={ticketNumber} />
    </>
  );
};

export default SuccessMain;
