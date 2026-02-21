"use client";

import { useEffect } from "react";

const AutoVerifyOtpEffect = ({
  otpValue,
  otpLength,
  onVerify
}: {
  otpValue: string;
  otpLength: number;
  onVerify: () => void;
}) => {
  useEffect(() => {
    if (otpValue.length === otpLength) {
      onVerify();
    }
  }, [otpValue]);

  return null;
};

export default AutoVerifyOtpEffect;
