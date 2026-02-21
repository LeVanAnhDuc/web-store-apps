// libs
import { AlertCircle } from "lucide-react";
// types
import type { ContactAdminMessages } from "@/types/libs";
// components
import { FadeIn } from "@/components/Animated";
// others
import CONSTANTS from "@/constants";

const { RESPONSE_HOURS } = CONSTANTS.CONTACT_ADMIN;

const ResponseTimeAlert = ({
  labels
}: {
  labels: ContactAdminMessages["form"]["responseTime"];
}) => (
  <FadeIn
    delay={0.2}
    y={-10}
    className="border-info/30 bg-info/10 mb-6 flex items-start gap-3 rounded-xl border p-4"
  >
    <AlertCircle className="text-info mt-0.5 h-5 w-5 shrink-0" />
    <div>
      <p className="text-foreground mb-1 text-sm font-medium">{labels.title}</p>
      <p className="text-muted-foreground text-xs">
        {labels.description.replace("{hours}", String(RESPONSE_HOURS))}
      </p>
    </div>
  </FadeIn>
);

export default ResponseTimeAlert;
