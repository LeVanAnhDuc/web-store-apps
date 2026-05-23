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
    className="border-warning/30 bg-warning/10 rounded-xl border p-4"
  >
    <h3 className="text-warning-foreground mb-2 text-sm font-semibold">
      {labels.title}
    </h3>
    <ul className="text-warning-foreground/80 list-inside list-disc space-y-1 text-sm">
      {ticketNumber && (
        <li>{labels.note1.replace("{ticketNumber}", ticketNumber)}</li>
      )}
    </ul>
  </FadeSlideUp>
);

export default ImportantNotes;
