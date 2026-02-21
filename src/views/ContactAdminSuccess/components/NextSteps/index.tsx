// libs
import { Clock, CheckCircle, AlertTriangle } from "lucide-react";
// types
import type { ContactAdminMessages } from "@/types/libs";
// components
import { FadeSlideUp, FadeSlideLeft } from "@/components/Animated";
// dataSources
import { NEXT_STEPS } from "@/dataSources/ContactAdmin";

const NextSteps = ({
  email,
  labels,
  responseLabels
}: {
  email?: string;
  labels: ContactAdminMessages["success"]["nextSteps"];
  responseLabels?: ContactAdminMessages["success"]["response"];
}) => {
  const steps = [
    { ...NEXT_STEPS[0], ...labels.step1 },
    { ...NEXT_STEPS[1], ...labels.step2 },
    { ...NEXT_STEPS[2], ...labels.step3 }
  ];

  return (
    <FadeSlideUp delay={0.5} className="mb-8">
      <h3 className="text-foreground mb-4 flex items-center gap-2">
        <Clock className="text-info h-5 w-5" />
        {labels.title}
      </h3>

      {responseLabels && (
        <FadeSlideLeft
          delay={0.55}
          className={`mb-4 rounded-lg p-4 ${
            email
              ? "border-success/30 bg-success/10 border"
              : "border-warning/30 bg-warning/10 border"
          }`}
        >
          {email ? (
            <div className="flex items-start gap-3">
              <CheckCircle className="text-success mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="text-foreground text-sm font-medium">
                  {responseLabels.withEmail?.replace("{email}", email)}
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  {responseLabels.withEmailTime}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-warning-foreground mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="text-warning-foreground text-sm">
                  {responseLabels.anonymous}
                </p>
                <p className="text-warning-foreground/80 mt-1 text-xs">
                  {responseLabels.anonymousNote}
                </p>
                <p className="text-warning-foreground mt-1 text-xs font-medium">
                  {responseLabels.anonymousSaveTicket}
                </p>
              </div>
            </div>
          )}
        </FadeSlideLeft>
      )}

      <div className="space-y-3">
        {steps.map((step, index) => (
          <FadeSlideLeft
            key={step.key}
            delay={0.6 + index * 0.1}
            className="bg-muted/50 flex items-start gap-4 rounded-xl p-4"
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${step.color} ${step.textColor}`}
            >
              {index + 1}
            </div>
            <div className="flex-1">
              <div className="text-foreground mb-1 text-sm">{step.title}</div>
              <p className="text-muted-foreground text-xs">
                {step.description.replace("{email}", email || "")}
              </p>
            </div>
          </FadeSlideLeft>
        ))}
      </div>
    </FadeSlideUp>
  );
};

export default NextSteps;
