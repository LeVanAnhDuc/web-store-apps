// libs
import { Clock } from "lucide-react";
// types
import type { ContactAdminMessages } from "@/types/libs";
// components
import { FadeSlideUp, FadeSlideLeft } from "@/components/Animated";
// dataSources
import { NEXT_STEPS } from "@/dataSources/ContactAdmin";

const NextSteps = ({
  labels
}: {
  labels: ContactAdminMessages["success"]["nextSteps"];
}) => {
  const steps = [
    { ...NEXT_STEPS[0], ...labels.step2 },
    { ...NEXT_STEPS[1], ...labels.step3 }
  ];

  return (
    <FadeSlideUp delay={0.5}>
      <h2 className="text-foreground mb-4 flex items-center gap-2 text-base font-semibold">
        <Clock className="text-info h-5 w-5" aria-hidden="true" />
        {labels.title}
      </h2>
      <div className="space-y-5">
        {steps.map((step, index) => (
          <FadeSlideLeft
            key={step.key}
            delay={0.6 + index * 0.1}
            className="bg-muted/50 flex items-start gap-4 rounded-xl p-4"
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${step.bgClass} ${step.textClass}`}
            >
              {index + 1}
            </div>
            <div className="flex-1">
              <p className="text-foreground mb-1 text-sm font-medium">
                {step.title}
              </p>
              <p className="text-muted-foreground text-sm">
                {step.description}
              </p>
            </div>
          </FadeSlideLeft>
        ))}
      </div>
    </FadeSlideUp>
  );
};

export default NextSteps;
