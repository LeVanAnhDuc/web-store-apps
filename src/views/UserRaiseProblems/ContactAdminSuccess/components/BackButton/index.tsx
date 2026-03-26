// components
import CustomButton from "@/components/CustomButton";

const BackButton = ({
  label,
  onClick
}: {
  label: string;
  onClick: () => void;
}) => (
  <CustomButton onClick={onClick} fullWidth className="h-12">
    {label}
  </CustomButton>
);

export default BackButton;
