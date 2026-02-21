// others
import { Link } from "@/i18n/navigation";
import CONSTANTS from "@/constants";
// components
import BackButtonBase from "@/components/BackButtonBase";

const { LOGIN } = CONSTANTS.ROUTES;

const BackButton = () => (
  <Link href={LOGIN}>
    <BackButtonBase />
  </Link>
);

export default BackButton;
