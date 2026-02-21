// libs
import { Mail, Smartphone, KeyRound, Headset } from "lucide-react";
// types
import type { LoginMessages } from "@/types/libs";
// components
import LoginOptionCard from "../../components/LoginOptionCard";
// others
import CONSTANTS from "@/constants";

const ANIMATION_DELAY_STEP = 0.1;

const { CONTACT_ADMIN, LOGIN_PASSWORD, LOGIN_OTP, LOGIN_MAGIC_LINK } =
  CONSTANTS.ROUTES;

const AlternativeOptions = ({
  email,
  currentPath,
  translations
}: {
  email: string;
  currentPath: string;
  translations: LoginMessages;
}) => {
  const encodedEmail = encodeURIComponent(email);
  const encodedFrom = encodeURIComponent(currentPath);

  const { magicLink, otp, password, contactAdmin } =
    translations.form.alternative;

  return (
    <div className="space-y-3">
      <LoginOptionCard
        icon={Mail}
        title={magicLink.title}
        description={magicLink.description}
        colorVariant="primary"
        href={`${LOGIN_MAGIC_LINK}?email=${encodedEmail}`}
        animationDelay={0}
      />
      <LoginOptionCard
        icon={Smartphone}
        title={otp.title}
        description={otp.description}
        colorVariant="info"
        href={`${LOGIN_OTP}?email=${encodedEmail}`}
        animationDelay={ANIMATION_DELAY_STEP}
      />
      <LoginOptionCard
        icon={KeyRound}
        title={password.title}
        description={password.description}
        colorVariant="success"
        href={`${LOGIN_PASSWORD}?email=${encodedEmail}`}
        animationDelay={ANIMATION_DELAY_STEP * 2}
      />
      <LoginOptionCard
        icon={Headset}
        title={contactAdmin.title}
        description={contactAdmin.description}
        colorVariant="info"
        href={`${CONTACT_ADMIN}?email=${encodedEmail}&from=${encodedFrom}`}
        animationDelay={ANIMATION_DELAY_STEP * 3}
      />
    </div>
  );
};

export default AlternativeOptions;
