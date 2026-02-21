// components
import { FadeIn } from "@/components/Animated";

const RecoveryOptionsInfo = ({ hint }: { hint: string }) => (
  <FadeIn
    delay={0.4}
    y={10}
    className="border-warning/30 bg-warning/10 mt-6 rounded-lg border p-4"
  >
    <p className="text-warning-foreground text-center text-sm">💡 {hint}</p>
  </FadeIn>
);

export default RecoveryOptionsInfo;
