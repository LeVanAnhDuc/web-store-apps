// components
import CustomButton from "@/components/CustomButton";

const NextButton = ({
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
    className="h-12"
  >
    {label}
  </CustomButton>
);

export default NextButton;
