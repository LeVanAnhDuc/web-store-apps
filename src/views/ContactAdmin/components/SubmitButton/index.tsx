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
  <CustomButton
    type="submit"
    loading={isSubmitting}
    fullWidth
    className="bg-primary hover:bg-primary/90 h-12 transition-all duration-200 hover:shadow-lg"
  >
    {isSubmitting ? labels.submitting : labels.submit}
  </CustomButton>
);

export default SubmitButton;
