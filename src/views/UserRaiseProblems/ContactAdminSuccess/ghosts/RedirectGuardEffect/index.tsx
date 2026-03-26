"use client";

// libs
import { useEffect } from "react";
// types
import type { ContactAdminFormValues } from "@/types/ContactAdmin";
// others
import { useRouter } from "@/i18n/navigation";
import CONSTANTS from "@/constants";

const { CONTACT_ADMIN } = CONSTANTS.ROUTES;

const RedirectGuardEffect = ({
  formData,
  ticketNumber
}: {
  formData: ContactAdminFormValues | null;
  ticketNumber: string | null;
}) => {
  const router = useRouter();

  useEffect(() => {
    if (!formData || !ticketNumber) {
      router.replace(CONTACT_ADMIN);
    }
  }, [formData, ticketNumber, router]);

  return null;
};

export default RedirectGuardEffect;
