// components
import { FadeIn } from "@/components/Animated";

const MagicLinkInstructions = ({
  labels
}: {
  labels: {
    checkEmail: string;
    clickLink: string;
    checkSpam: string;
  };
}) => (
  <FadeIn delay={0.3} className="mb-6 space-y-5">
    <div className="bg-info/10 rounded-lg p-4">
      <p className="text-foreground text-sm">
        <span className="mb-2 block">📧 {labels.checkEmail}</span>
        {labels.clickLink}
      </p>
    </div>

    <div className="border-warning/30 bg-warning/10 rounded-lg border p-4">
      <p className="text-warning-foreground text-sm">
        💡 <span>{labels.checkSpam}</span>
      </p>
    </div>
  </FadeIn>
);

export default MagicLinkInstructions;
