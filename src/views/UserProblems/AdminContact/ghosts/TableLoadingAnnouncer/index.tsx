"use client";
// libs
import { useEffect } from "react";
import { useTranslations } from "next-intl";
// hooks
import { useAnnounce } from "@/hooks";

const TableLoadingAnnouncer = ({
  isLoading,
  total
}: {
  isLoading: boolean;
  total?: number;
}) => {
  const tAnnounce = useTranslations("loginHistory.announce");
  const { announce } = useAnnounce();

  useEffect(() => {
    if (isLoading) announce(tAnnounce("loading"));
  }, [isLoading, announce, tAnnounce]);

  useEffect(() => {
    if (typeof total === "number") {
      announce(tAnnounce("loaded", { total }));
    }
  }, [total, announce, tAnnounce]);

  return null;
};

export default TableLoadingAnnouncer;
