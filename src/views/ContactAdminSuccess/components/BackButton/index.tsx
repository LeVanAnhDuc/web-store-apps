// libs
import { ArrowLeft } from "lucide-react";
// components
import CustomButton from "@/components/CustomButton";

const BackButton = ({
  label,
  onClick
}: {
  label: string;
  onClick: () => void;
}) => (
  <CustomButton
    onClick={onClick}
    iconLeft={<ArrowLeft className="mr-2 h-5 w-5" />}
    className="bg-info text-info-foreground hover:bg-info/90 h-12 flex-1 transition-all duration-200 hover:shadow-lg"
  >
    {label}
  </CustomButton>
);

export default BackButton;
