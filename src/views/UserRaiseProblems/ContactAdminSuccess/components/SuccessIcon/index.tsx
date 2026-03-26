// libs
import { CheckCircle2 } from "lucide-react";
// components
import { ScaleSpring, PulseRipple } from "@/components/Animated";

const SuccessIcon = () => (
  <ScaleSpring
    stiffness={200}
    damping={15}
    className="bg-success relative mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full"
  >
    <CheckCircle2 className="text-success-foreground h-14 w-14" />
    <PulseRipple color="bg-success" />
  </ScaleSpring>
);

export default SuccessIcon;
