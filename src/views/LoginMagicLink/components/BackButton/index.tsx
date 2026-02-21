// others
import { Link } from "@/i18n/navigation";
import CONSTANTS from "@/constants";
// components
import BackButtonBase from "@/components/BackButtonBase";

const { LOGIN_ALTERNATIVE } = CONSTANTS.ROUTES;

const BackButton = ({ email }: { email: string }) => {
  const encodedEmail = encodeURIComponent(email);

  return (
    <Link href={`${LOGIN_ALTERNATIVE}?email=${encodedEmail}`}>
      <BackButtonBase />
    </Link>
  );
};

export default BackButton;
