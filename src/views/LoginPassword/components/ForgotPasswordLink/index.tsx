// others
import { Link } from "@/i18n/navigation";
import CONSTANTS from "@/constants";

const { FORGOT_PASSWORD } = CONSTANTS.ROUTES;

const ForgotPasswordLink = ({
  email,
  label
}: {
  email: string;
  label: string;
}) => {
  const encodedEmail = encodeURIComponent(email);

  return (
    <div className="flex items-center justify-between text-sm">
      <Link
        href={`${FORGOT_PASSWORD}?email=${encodedEmail}`}
        className="text-primary transition-colors duration-200 hover:underline"
      >
        {label}
      </Link>
    </div>
  );
};

export default ForgotPasswordLink;
