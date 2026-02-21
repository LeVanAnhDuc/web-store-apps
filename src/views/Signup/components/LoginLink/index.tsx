// others
import { Link } from "@/i18n/navigation";
import CONSTANTS from "@/constants";

const { LOGIN } = CONSTANTS.ROUTES;

const LoginLink = ({
  labels
}: {
  labels: {
    description: string;
    login: string;
  };
}) => (
  <div className="mt-8 text-center">
    <p className="text-muted-foreground text-sm">
      {labels.description}{" "}
      <Link
        href={LOGIN}
        className="text-primary transition-colors duration-200 hover:underline"
      >
        {labels.login}
      </Link>
    </p>
  </div>
);

export default LoginLink;
