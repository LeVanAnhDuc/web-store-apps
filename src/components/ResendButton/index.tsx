"use client";

// components
import CustomButton from "@/components/CustomButton";
import { FadeIn } from "@/components/Animated";
import { Link } from "@/i18n/navigation";

const ResendButton = ({
  countdown,
  canResend,
  isResending,
  isProcessing = false,
  onResend,
  tryOtherHref,
  labels
}: {
  countdown: number;
  canResend: boolean;
  isResending: boolean;
  isProcessing?: boolean;
  onResend: () => void;
  tryOtherHref: string;
  labels: {
    resend: string;
    resendIn: string;
    sending: string;
    tryOther: string;
  };
}) => (
  <FadeIn delay={0.4} className="space-y-3">
    <CustomButton
      onClick={onResend}
      disabled={!canResend || isProcessing}
      loading={isResending}
      variant="outline"
      fullWidth
      className="border-border hover:border-primary/50 hover:bg-muted h-12 transition-all duration-200"
    >
      {isResending
        ? labels.sending
        : canResend
          ? labels.resend
          : labels.resendIn.replace("{seconds}", String(countdown))}
    </CustomButton>

    <div className="text-center">
      <Link
        href={tryOtherHref}
        aria-disabled={isProcessing}
        className="text-primary hover:text-primary/80 text-sm transition-colors duration-200 hover:underline aria-disabled:pointer-events-none aria-disabled:opacity-50"
      >
        {labels.tryOther}
      </Link>
    </div>
  </FadeIn>
);

export default ResendButton;
