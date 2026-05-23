// types
import type { ContactAdminMessages } from "@/types/libs";
// components
import CustomButton from "@/components/CustomButton";

const SubmitButton = ({
  isSubmitting,
  labels
}: {
  isSubmitting: boolean;
  labels: ContactAdminMessages["form"]["button"];
}) => (
  <CustomButton type="submit" loading={isSubmitting} fullWidth className="h-12">
    {isSubmitting ? labels.submitting : labels.submit}
  </CustomButton>
);

export default SubmitButton;
