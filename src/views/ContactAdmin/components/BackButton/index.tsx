// components
import BackButtonBase from "@/components/BackButtonBase";
// others
import { Link } from "@/i18n/navigation";

const BackButton = ({ referrerPath = "/" }: { referrerPath?: string }) => (
  <Link href={referrerPath}>
    <BackButtonBase />
  </Link>
);

export default BackButton;
