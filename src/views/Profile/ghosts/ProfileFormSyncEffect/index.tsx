"use client";

// libs
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
// types
import type { UpdatePersonalInfoFormValues } from "@/forms/UpdatePersonalInfo/validations";
import type { MyProfileResponse } from "@/types/User";

const ProfileFormSyncEffect = ({
  profile
}: {
  profile: MyProfileResponse | undefined;
}) => {
  const { reset } = useFormContext<UpdatePersonalInfoFormValues>();

  useEffect(() => {
    if (!profile) return;
    const [firstName, ...rest] = profile.fullName.split(" ");
    reset({
      firstName: firstName ?? "",
      lastName: rest.join(" "),
      phone: profile.phone ?? "",
      address: profile.address ?? "",
      dateOfBirth: profile.dateOfBirth
        ? profile.dateOfBirth.substring(0, 10)
        : "",
      gender: profile.gender ?? ""
    });
  }, [profile, reset]);

  return null;
};

export default ProfileFormSyncEffect;
