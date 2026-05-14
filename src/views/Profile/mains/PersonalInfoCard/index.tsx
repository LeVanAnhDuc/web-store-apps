"use client";

// libs
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
// types
import type { UpdatePersonalInfoFormValues } from "@/forms/UpdatePersonalInfo/validations";
import type {
  GenderEnum,
  MyProfileResponse,
  UpdateProfileData
} from "@/types/User";
// components
import { Card } from "@/components/ui/card";
import { FormItem, FormLabel } from "@/components/ui/form";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import BirthdayInput from "@/components/BirthdayInput";
import FirstNameField from "@/views/Profile/components/FirstNameField";
import LastNameField from "@/views/Profile/components/LastNameField";
import PhoneField from "@/views/Profile/components/PhoneField";
import AddressField from "@/views/Profile/components/AddressField";
import GenderField from "@/views/Profile/components/GenderField";
// ghosts
import ProfileFormSyncEffect from "@/views/Profile/ghosts/ProfileFormSyncEffect";
// hooks
import { useAnnounce } from "@/hooks";
// forms
import { updatePersonalInfoFormProps } from "@/forms/UpdatePersonalInfo";
// requests
import { getMyProfile, updateMyProfile } from "@/requests/user";

const PersonalInfoCard = () => {
  const t = useTranslations("profile.personalInfo");
  const { announce } = useAnnounce();
  const queryClient = useQueryClient();

  const { data: profile } = useQuery({
    queryKey: ["myProfile"],
    queryFn: getMyProfile
  });

  const methods = useForm<UpdatePersonalInfoFormValues>({
    ...updatePersonalInfoFormProps
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UpdateProfileData) => updateMyProfile(data),
    onMutate: () => announce(t("announce.saving")),
    onSuccess: (updated: MyProfileResponse) => {
      announce(t("announce.saved"));
      queryClient.setQueryData(["myProfile"], updated);
      toast.success(t("toast.success"));
    },
    onError: () => toast.error(t("toast.error"))
  });

  const onSubmit = (data: UpdatePersonalInfoFormValues) => {
    const fullName = [data.firstName, data.lastName].filter(Boolean).join(" ");
    const payload: UpdateProfileData = { fullName };
    if (data.phone) payload.phone = data.phone;
    if (data.address) payload.address = data.address;
    if (data.dateOfBirth) payload.dateOfBirth = data.dateOfBirth;
    if (data.gender) payload.gender = data.gender as GenderEnum;
    mutate(payload);
  };

  const handleCancel = () => {
    if (!profile) return;
    const [firstName, ...rest] = profile.fullName.split(" ");
    methods.reset({
      firstName: firstName ?? "",
      lastName: rest.join(" "),
      phone: profile.phone ?? "",
      address: profile.address ?? "",
      dateOfBirth: profile.dateOfBirth
        ? profile.dateOfBirth.substring(0, 10)
        : "",
      gender: profile.gender ?? ""
    });
  };

  if (!profile) return null;

  return (
    <Card
      className="rounded-2xl border p-0"
      aria-labelledby="personal-info-title"
    >
      <div className="border-border flex flex-col gap-1 border-b px-6 py-5">
        <h2
          id="personal-info-title"
          className="text-foreground text-base font-semibold"
        >
          {t("title")}
        </h2>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>
      <FormProvider {...methods}>
        <ProfileFormSyncEffect profile={profile} />
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 px-6 py-6"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FirstNameField control={methods.control} isPending={isPending} />
            <LastNameField control={methods.control} isPending={isPending} />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormItem>
              <FormLabel htmlFor="profile-email">{t("fields.email")}</FormLabel>
              <CustomInput
                id="profile-email"
                value={profile.email}
                readOnly
                disabled
                aria-readonly="true"
              />
            </FormItem>
            <PhoneField control={methods.control} isPending={isPending} />
          </div>
          <AddressField control={methods.control} isPending={isPending} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <BirthdayInput
              name="dateOfBirth"
              label={t("fields.dateOfBirth")}
              placeholder={t("placeholders.dateOfBirth")}
              disabled={isPending}
            />
            <GenderField control={methods.control} isPending={isPending} />
          </div>
          <div className="border-border flex justify-end gap-3 border-t pt-5">
            <CustomButton
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isPending || !methods.formState.isDirty}
            >
              {t("buttons.cancel")}
            </CustomButton>
            <CustomButton
              type="submit"
              loading={isPending}
              disabled={!methods.formState.isDirty || isPending}
            >
              {t("buttons.save")}
            </CustomButton>
          </div>
        </form>
      </FormProvider>
    </Card>
  );
};

export default PersonalInfoCard;
