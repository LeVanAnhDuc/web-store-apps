"use client";

// libs
import { FormProvider, useForm } from "react-hook-form";
// types
import type { SignupInfoFormValues } from "@/types/Signup";
import type { SignupMessages } from "@/types/libs";
// components
import PasswordInput from "@/components/PasswordInput";
import FullNameInput from "../../components/FullNameInput";
import GenderSelect from "../../components/GenderSelect";
import BirthdayInput from "../../components/BirthdayInput";
import SubmitButton from "../../components/SubmitButton";
// forms
import { signupInfoFormProps } from "@/forms/Signup";
// others
import CONSTANTS from "@/constants";

const { PASSWORD, PASSWORD_CONFIRM } = CONSTANTS.FIELD_NAMES.SIGNUP_FIELD_NAMES;

const InfoStepForm = ({ translations }: { translations: SignupMessages }) => {
  const methods = useForm<SignupInfoFormValues>({ ...signupInfoFormProps });

  const {
    input: {
      labelFullName,
      placeholderFullName,
      labelGender,
      placeholderGender,
      gender,
      labelBirthday,
      placeholderBirthday,
      labelPassword,
      placeholderPassword,
      labelPasswordConfirm,
      placeholderPasswordConfirm
    },
    button: { submit }
  } = translations.infoStep;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = (data: SignupInfoFormValues) => {
    // TODO: Call API to register user with email and form data
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
        <FullNameInput
          label={labelFullName}
          placeholder={placeholderFullName}
        />
        <GenderSelect
          label={labelGender}
          placeholder={placeholderGender}
          genderLabels={gender}
        />
        <BirthdayInput
          label={labelBirthday}
          placeholder={placeholderBirthday}
        />
        <PasswordInput
          name={PASSWORD}
          label={labelPassword}
          placeholder={placeholderPassword}
          required
        />
        <PasswordInput
          name={PASSWORD_CONFIRM}
          label={labelPasswordConfirm}
          placeholder={placeholderPasswordConfirm}
          required
        />
        <SubmitButton label={submit} />
      </form>
    </FormProvider>
  );
};

export default InfoStepForm;
