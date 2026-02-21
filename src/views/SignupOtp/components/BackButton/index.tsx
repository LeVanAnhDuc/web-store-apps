// others
import { Link } from "@/i18n/navigation";
import CONSTANTS from "@/constants";
// components
import BackButtonBase from "@/components/BackButtonBase";

const { SIGNUP } = CONSTANTS.ROUTES;

const BackButton = () => (
  <Link href={SIGNUP}>
    <BackButtonBase />
  </Link>
);

export default BackButton;
