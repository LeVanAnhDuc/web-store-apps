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
    <FadeSlideUp delay={0.5} className="mb-8">
      <h3 className="text-foreground mb-4 flex items-center gap-2">
        <Clock className="text-info h-5 w-5" />
        {labels.title}
      </h3>
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
