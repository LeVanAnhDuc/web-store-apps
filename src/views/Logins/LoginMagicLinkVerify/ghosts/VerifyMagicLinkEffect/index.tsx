"use client";

// libs
import { useEffect } from "react";
// hooks
import { useMagicLinkVerify } from "../../hooks/useMagicLinkVerify";

const VerifyMagicLinkEffect = ({
  email,
  token
}: {
  email: string;
  token: string;
}) => {
  const { verifyMagicLink } = useMagicLinkVerify();

  useEffect(() => {
    verifyMagicLink({ email, token });
  }, [verifyMagicLink, email, token]);

  return null;
};

export default VerifyMagicLinkEffect;
