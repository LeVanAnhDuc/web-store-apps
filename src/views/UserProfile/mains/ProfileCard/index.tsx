"use client";

// libs
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// hooks
import { useAnnounce } from "@/hooks";
import { format } from "date-fns";
import { vi as viLocale, enUS } from "date-fns/locale";
import { useLocale, useTranslations } from "next-intl";
import { CalendarIcon } from "lucide-react";
// types
import type { UpdateProfileFormValues } from "@/forms/UpdateProfile/validations";
import type { MyProfileResponse, UpdateProfileData } from "@/types/User";
// components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import ProfileCardSkeleton from "../../components/ProfileCardSkeleton";
import ProfileFields from "../../components/ProfileFields";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import CustomSelectTrigger from "@/components/CustomSelectTrigger";
import FormFieldMessage from "@/components/FormFieldMessage";
// forms
import { updateProfileFormProps } from "@/forms/UpdateProfile";
// requests
import { getMyProfile, updateMyProfile } from "@/requests/user";
// others
import { GENDER_VALUES } from "@/constants/pages/signup";
import { getInitials, formatDateLong, parseLocalDate } from "@/utils";
import { cn } from "@/libs/utils";

const ProfileCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const t = useTranslations("user.profile");
  const tAnnounce = useTranslations("user.profile.announce");
  const { announce } = useAnnounce();
  const locale = useLocale();
  const dateLocale = locale === "vi" ? viLocale : enUS;
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["myProfile"],
    queryFn: getMyProfile
  });

  const methods = useForm<UpdateProfileFormValues>({
    ...updateProfileFormProps
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UpdateProfileData) => updateMyProfile(data),
    onMutate: () => {
      announce(tAnnounce("updating"));
    },
    onSuccess: (updated: MyProfileResponse) => {
      announce(tAnnounce("updated"));
      queryClient.setQueryData(["myProfile"], updated);
      toast.success(t("toast.updateSuccess"));
      setIsEditing(false);
    },
    onError: (error: unknown) => {
      const serverMsg = (
        error as { response?: { data?: { message?: string } } }
      )?.response?.data?.message;
      toast.error(serverMsg ?? "Failed to update profile");
    }
  });

  const handleEditStart = () => {
    if (!profile) return;
    methods.reset({
      fullName: profile.fullName,
      phone: profile.phone ?? undefined,
      address: profile.address ?? undefined,
      dateOfBirth: profile.dateOfBirth
        ? profile.dateOfBirth.split("T")[0]
        : undefined,
      gender: profile.gender ?? undefined
    });
    announce(tAnnounce("editMode"));
    setIsEditing(true);
  };

  const onSubmit = (data: UpdateProfileFormValues) => {
    const payload: UpdateProfileData = {};
    if (data.fullName) payload.fullName = data.fullName;
    if (data.phone) payload.phone = data.phone;
    if (data.address) payload.address = data.address;
    if (data.dateOfBirth) payload.dateOfBirth = data.dateOfBirth;
    if (data.gender) payload.gender = data.gender;
    mutate(payload);
  };

  if (isLoading) return <ProfileCardSkeleton />;
  if (!profile) return null;

  const initials = getInitials(profile.fullName);
  const today = new Date();
  const minDate = new Date(
    today.getFullYear() - 100,
    today.getMonth(),
    today.getDate()
  );

  const viewFields = [
    { label: t("fields.email"), value: profile.email },
    { label: t("fields.phone"), value: profile.phone },
    { label: t("fields.address"), value: profile.address },
    {
      label: t("fields.dateOfBirth"),
      value: formatDateLong(profile.dateOfBirth)
    },
    {
      label: t("fields.gender"),
      value: profile.gender ? t(`gender.${profile.gender}`) : null
    },
    { label: t("fields.createdAt"), value: formatDateLong(profile.createdAt) }
  ];

  const readOnlyFields = [
    { label: t("fields.email"), value: profile.email },
    { label: t("fields.createdAt"), value: formatDateLong(profile.createdAt) }
  ];

  return (
    <div className="bg-card rounded-xl border p-6">
      <div className="flex flex-col items-center gap-3 border-b pb-6">
        <Avatar className="ring-border size-24 ring-2">
          <AvatarImage src={profile.avatar ?? ""} alt={profile.fullName} />
          <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="text-foreground text-xl font-semibold">
            {profile.fullName}
          </h2>
          <p className="text-muted-foreground text-sm">{profile.email}</p>
        </div>
      </div>
      {isEditing ? (
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="mt-6 space-y-5"
          >
            <FormField
              control={methods.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("fields.fullName")}</FormLabel>
                  <FormControl>
                    <CustomInput
                      {...field}
                      placeholder={t("placeholders.fullName")}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormFieldMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={methods.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("fields.address")}</FormLabel>
                  <FormControl>
                    <CustomInput
                      {...field}
                      value={field.value ?? ""}
                      placeholder={t("placeholders.address")}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormFieldMessage />
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name="dateOfBirth"
              render={({ field }) => {
                const selectedDate = field.value
                  ? parseLocalDate(field.value)
                  : undefined;
                return (
                  <FormItem>
                    <FormLabel>{t("fields.dateOfBirth")}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <CustomButton
                            type="button"
                            variant="outline"
                            disabled={isPending}
                            fullWidth
                            className={cn(
                              "h-12 justify-between px-3! py-2 text-sm font-normal hover:bg-transparent",
                              field.value
                                ? "hover:text-foreground"
                                : "text-muted-foreground hover:text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(selectedDate!, "dd/MM/yyyy", {
                                locale: dateLocale
                              })
                            ) : (
                              <span>{t("placeholders.dateOfBirth")}</span>
                            )}
                            <CalendarIcon className="size-4 opacity-50" />
                          </CustomButton>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => {
                            field.onChange(
                              date ? format(date, "yyyy-MM-dd") : ""
                            );
                          }}
                          disabled={(date) => date > today || date < minDate}
                          defaultMonth={selectedDate ?? new Date(2000, 0)}
                          captionLayout="dropdown"
                          fromYear={minDate.getFullYear()}
                          toYear={today.getFullYear()}
                          locale={dateLocale}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormFieldMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={methods.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("fields.gender")}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? undefined}
                    disabled={isPending}
                  >
                    <FormControl>
                      <CustomSelectTrigger>
                        <SelectValue placeholder={t("placeholders.gender")} />
                      </CustomSelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {GENDER_VALUES.map((option) => (
                        <SelectItem key={option} value={option}>
                          {t(`gender.${option}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormFieldMessage />
                </FormItem>
              )}
            />
            <ProfileFields fields={readOnlyFields} />
            <div className="flex justify-end gap-3">
              <CustomButton
                type="button"
                variant="outline"
                onClick={() => {
                  announce(tAnnounce("viewMode"));
                  setIsEditing(false);
                }}
                disabled={isPending}
              >
                {t("button.cancel")}
              </CustomButton>
              <CustomButton
                type="submit"
                loading={isPending}
                disabled={!methods.formState.isDirty || isPending}
              >
                {t("button.save")}
              </CustomButton>
            </div>
          </form>
        </FormProvider>
      ) : (
        <>
          <ProfileFields fields={viewFields} />
          <div className="mt-6 flex justify-end">
            <CustomButton variant="outline" onClick={handleEditStart}>
              {t("button.edit")}
            </CustomButton>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileCard;
