// types
import type { buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
// components
import CustomButton from "@/components/CustomButton";

const NextButton = ({
  label,
  loading = false,
  fullWidth = true,
  size = "lg"
}: {
  label: string;
  loading?: boolean;
  fullWidth?: boolean;
  size?: VariantProps<typeof buttonVariants>["size"];
}) => (
  <CustomButton
    type="submit"
    size={size}
    loading={loading}
    fullWidth={fullWidth}
    className={`bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-lg text-base font-medium transition-all duration-200 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 ${!fullWidth && "flex-1"}`}
  >
    {label}
  </CustomButton>
);

export default NextButton;
