// others
import { Link } from "@/i18n/navigation";
import CONSTANTS from "@/constants";
// components
import BackButtonBase from "@/components/BackButtonBase";

const { FORGOT_PASSWORD } = CONSTANTS.ROUTES;

const BackButton = ({ email }: { email: string }) => {
  const encodedEmail = encodeURIComponent(email);

  return (
    <Link href={`${FORGOT_PASSWORD}?email=${encodedEmail}`}>
      <BackButtonBase />
    </Link>
  );
};

export default BackButton;
