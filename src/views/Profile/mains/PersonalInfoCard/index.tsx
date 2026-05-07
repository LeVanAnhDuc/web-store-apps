"use client";

// libs
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
// types
import type { UpdatePersonalInfoFormValues } from "@/forms/UpdatePersonalInfo/validations";
import type { MyProfileResponse, UpdateProfileData } from "@/types/User";
// components
import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import FormFieldMessage from "@/components/FormFieldMessage";
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

  useEffect(() => {
    if (!profile) return;
    const [firstName, ...rest] = profile.fullName.split(" ");
    methods.reset({
      firstName: firstName ?? "",
      lastName: rest.join(" "),
      phone: profile.phone ?? "",
      username: "",
      bio: ""
    });
  }, [profile, methods]);

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
    mutate(payload);
  };

  const handleCancel = () => {
    if (!profile) return;
    const [firstName, ...rest] = profile.fullName.split(" ");
    methods.reset({
      firstName: firstName ?? "",
      lastName: rest.join(" "),
      phone: profile.phone ?? "",
      username: "",
      bio: ""
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
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 px-6 py-6"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField
              control={methods.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("fields.firstName")}</FormLabel>
                  <FormControl>
                    <CustomInput
                      {...field}
                      placeholder={t("placeholders.firstName")}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormFieldMessage />
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("fields.lastName")}</FormLabel>
                  <FormControl>
                    <CustomInput
                      {...field}
                      placeholder={t("placeholders.lastName")}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormFieldMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={methods.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("fields.phone")}</FormLabel>
                  <FormControl>
                    <CustomInput
                      {...field}
                      value={field.value ?? ""}
                      placeholder={t("placeholders.phone")}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormFieldMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={methods.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fields.username")}</FormLabel>
                <FormControl>
                  <CustomInput
                    {...field}
                    value={field.value ?? ""}
                    placeholder={t("placeholders.username")}
                    disabled={isPending}
                  />
                </FormControl>
                <FormFieldMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="profile-bio">{t("fields.bio")}</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    id="profile-bio"
                    value={field.value ?? ""}
                    placeholder={t("placeholders.bio")}
                    disabled={isPending}
                    rows={3}
                    className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring w-full resize-y rounded-md border px-3 py-2 text-sm shadow-sm focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </FormControl>
                <FormFieldMessage />
              </FormItem>
            )}
          />
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
