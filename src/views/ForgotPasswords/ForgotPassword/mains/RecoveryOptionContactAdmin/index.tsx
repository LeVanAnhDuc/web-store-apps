// libs
import { Headset } from "lucide-react";
// components
import RecoveryOptionCardLink from "../../components/RecoveryOptionCardLink";
// others
import CONSTANTS from "@/constants";

const { CONTACT_ADMIN } = CONSTANTS.ROUTES;

const RecoveryOptionContactAdmin = ({
  email,
  currentPath,
  title,
  description,
  delay
}: {
  email: string;
  currentPath: string;
  title: string;
  description: string;
  delay?: number;
}) => {
  const encodedEmail = encodeURIComponent(email);
  const encodedFrom = encodeURIComponent(currentPath);
  const href = `${CONTACT_ADMIN}?email=${encodedEmail}&from=${encodedFrom}`;

  return (
    <RecoveryOptionCardLink
      icon={Headset}
      title={title}
      description={description}
      colorVariant="info"
      href={href}
      animationDelay={delay}
    />
  );
};

export default RecoveryOptionContactAdmin;
