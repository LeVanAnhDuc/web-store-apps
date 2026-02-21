// types
import type { LoginMessages } from "@/types/libs";
// components
import { FadeIn } from "@/components/Animated";

const MagicLinkInstructions = ({
  translations
}: {
  translations: LoginMessages;
}) => {
  const {
    instruction: { check, detail },
    hint: { title, description }
  } = translations.form.magicLink;

  return (
    <FadeIn delay={0.3} className="mb-6 space-y-4">
      <div className="bg-info/10 rounded-lg p-4">
        <p className="text-foreground text-sm">
          <span className="mb-2 block">{check}</span>
          {detail}
        </p>
      </div>

      <div className="border-warning/30 bg-warning/10 rounded-lg border p-4">
        <p className="text-warning-foreground text-sm">
          <span className="font-medium">{title}</span> {description}
        </p>
      </div>
    </FadeIn>
  );
};

export default MagicLinkInstructions;
