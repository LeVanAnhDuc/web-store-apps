// components
import CustomButton from "@/components/CustomButton";

const SubmitButton = ({
  label,
  loading = false,
  fullWidth = true
}: {
  label: string;
  loading?: boolean;
  fullWidth?: boolean;
}) => (
  <CustomButton
    type="submit"
    loading={loading}
    fullWidth={fullWidth}
    className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-lg transition-all duration-200 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
  >
    {label}
  </CustomButton>
);

export default SubmitButton;
