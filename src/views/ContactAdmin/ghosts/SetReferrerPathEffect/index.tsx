"use client";

// libs
import { useEffect } from "react";
// stores
import { useContactAdminStore } from "@/stores";

const SetReferrerPathEffect = ({ referrerPath }: { referrerPath?: string }) => {
  const setReferrerPath = useContactAdminStore(
    (state) => state.setReferrerPath
  );

  useEffect(() => {
    if (referrerPath) {
      setReferrerPath(referrerPath);
    }
  }, [referrerPath, setReferrerPath]);

  return null;
};

export default SetReferrerPathEffect;
