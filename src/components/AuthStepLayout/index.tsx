// types
import type { ReactNode } from "react";
// components
import EmailBadge from "@/components/EmailBadge";
import { FadeSlideUp, FadeIn } from "@/components/Animated";
// others
import { cn } from "@/libs/utils";

type MaxWidth = "md" | "2xl";

const MAX_WIDTH_CLASSES: Record<MaxWidth, string> = {
  md: "max-w-md",
  "2xl": "max-w-2xl"
};

const AuthStepLayout = ({
  title,
  description,
  email,
  backButton,
  maxWidth = "md",
  children,
  ghostComponents
}: {
  title?: string;
  description?: string;
  email?: string;
  backButton?: ReactNode;
  maxWidth?: MaxWidth;
  children: ReactNode;
  ghostComponents?: ReactNode;
}) => (
  <main className="auth-background flex items-center justify-center">
    <FadeSlideUp className={cn("w-full", MAX_WIDTH_CLASSES[maxWidth])}>
      <div className="auth-card relative p-8 md:p-10">
        {backButton}
        {title && (
          <FadeIn delay={0.2} y={10}>
            <h1 className="text-foreground mb-5 text-center text-2xl font-medium">
              {title}
            </h1>
            {description && (
              <p className="text-muted-foreground mb-4">{description}</p>
            )}
          </FadeIn>
        )}

        {email && <EmailBadge email={email} />}

        {children}
      </div>
    </FadeSlideUp>

    {ghostComponents}
  </main>
);

export default AuthStepLayout;
