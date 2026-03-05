// libs
import { redirect } from "next/navigation";
import { Link } from "lucide-react";
// components
import AuthStepLayout from "@/components/AuthStepLayout";
import AuthIcon from "@/components/AuthIcon";
import { Spinner } from "@/components/ui/spinner";
// ghosts
import VerifyMagicLinkEffect from "./ghosts/VerifyMagicLinkEffect";
// others
import CONSTANTS from "@/constants";

const { LOGIN } = CONSTANTS.ROUTES;

const LoginMagicLinkVerify = async ({
  searchParams
}: {
  searchParams: Promise<{ token?: string; email?: string }>;
}) => {
  const { token, email } = await searchParams;

  if (!token || !email) {
    redirect(LOGIN);
  }

  const decodedEmail = decodeURIComponent(email);

  return (
    <AuthStepLayout
      icon={<AuthIcon Icon={Link} animated />}
      title="Verifying magic link..."
      email={decodedEmail}
    >
      <div className="flex justify-center py-4">
        <Spinner className="size-8" />
      </div>
      <VerifyMagicLinkEffect email={decodedEmail} token={token} />
    </AuthStepLayout>
  );
};

export default LoginMagicLinkVerify;
