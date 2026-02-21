// types
import type { ContactAdminMessages } from "@/types/libs";
// components
import { FadeSlideUp } from "@/components/Animated";

const ImportantNotes = ({
  ticketNumber,
  labels
}: {
  ticketNumber: string | null;
  labels: ContactAdminMessages["success"]["importantNotes"];
}) => (
  <FadeSlideUp
    delay={0.9}
    className="border-warning/30 bg-warning/10 mb-8 rounded-xl border p-4"
  >
    <p className="text-warning-foreground mb-2 text-sm">{labels.title}</p>
    <ul className="text-warning-foreground/80 list-inside list-disc space-y-1 text-xs">
      {ticketNumber && (
        <li>{labels.note1.replace("{ticketNumber}", ticketNumber)}</li>
      )}
      <li>{labels.note2}</li>
      <li>{labels.note3}</li>
    </ul>
  </FadeSlideUp>
);

export default ImportantNotes;
