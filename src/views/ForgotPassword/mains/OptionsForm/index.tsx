// libs
import { Smartphone, Mail, ShieldCheck, Headset } from "lucide-react";
// types
import type { ForgotPasswordMessages } from "@/types/libs";
// components
import RecoveryOptionCard from "../../components/RecoveryOptionCard";
import RecoveryOptionsInfo from "../../components/RecoveryOptionsInfo";
// others
import CONSTANTS from "@/constants";

const ANIMATION_DELAY_STEP = 0.1;
const { FORGOT_PASSWORD_OTP, FORGOT_PASSWORD_MAGIC_LINK, CONTACT_ADMIN } =
  CONSTANTS.ROUTES;

const OptionsForm = ({
  email,
  currentPath,
  has2FAEnabled = false,
  translations
}: {
  email: string;
  currentPath: string;
  has2FAEnabled?: boolean;
  translations: ForgotPasswordMessages;
}) => {
  const encodedEmail = encodeURIComponent(email);
  const encodedFrom = encodeURIComponent(currentPath);

  const { description, otp, magicLink, twoFactor, contactAdmin, hint } =
    translations.form.options;
  const { unavailable } = translations.badge;

  return (
    <>
      <p className="text-muted-foreground mb-6 text-center">{description}</p>

      <div className="space-y-3">
        <RecoveryOptionCard
          icon={Smartphone}
          title={otp.title}
          description={otp.description}
          colorVariant="info"
          href={`${FORGOT_PASSWORD_OTP}?email=${encodedEmail}`}
          animationDelay={0}
        />
        <RecoveryOptionCard
          icon={Mail}
          title={magicLink.title}
          description={magicLink.description}
          colorVariant="primary"
          href={`${FORGOT_PASSWORD_MAGIC_LINK}?email=${encodedEmail}`}
          animationDelay={ANIMATION_DELAY_STEP}
        />
        <RecoveryOptionCard
          icon={ShieldCheck}
          title={twoFactor.title}
          description={
            has2FAEnabled
              ? twoFactor.descriptionEnabled
              : twoFactor.descriptionDisabled
          }
          colorVariant="success"
          animationDelay={ANIMATION_DELAY_STEP * 2}
          disabled={!has2FAEnabled}
          unavailableLabel={unavailable}
        />
        <RecoveryOptionCard
          icon={Headset}
          title={contactAdmin.title}
          description={contactAdmin.description}
          colorVariant="info"
          href={`${CONTACT_ADMIN}?email=${encodedEmail}&from=${encodedFrom}`}
          animationDelay={ANIMATION_DELAY_STEP * 3}
        />
      </div>

      <RecoveryOptionsInfo hint={hint} />
    </>
  );
};

export default OptionsForm;
