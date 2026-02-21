// components
import CustomButton from "@/components/CustomButton";
// others
import CONSTANTS from "@/constants";
import { Link } from "@/i18n/navigation";

const { LOGIN_ALTERNATIVE } = CONSTANTS.ROUTES;

const TryAnotherButton = ({
  email,
  disabled = false,
  label
}: {
  email: string;
  disabled?: boolean;
  label: string;
}) => {
  const encodedEmail = encodeURIComponent(email);
  const href = `${LOGIN_ALTERNATIVE}?email=${encodedEmail}`;
  const className =
    "border-input hover:bg-accent h-12 flex-1 rounded-lg transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50";

  if (disabled) {
    return (
      <CustomButton variant="outline" disabled className={className}>
        {label}
      </CustomButton>
    );
  }

  return (
    <Link href={href}>
      <CustomButton variant="outline" className={className}>
        {label}
      </CustomButton>
    </Link>
  );
};

export default TryAnotherButton;
