"use client";

// libs
import { Printer } from "lucide-react";
// components
import CustomButton from "@/components/CustomButton";

const PrintButton = ({ label }: { label: string }) => {
  const handlePrint = () => window.print();

  return (
    <CustomButton
      variant="outline"
      onClick={handlePrint}
      iconLeft={<Printer className="mr-2 h-5 w-5" />}
      className="hover:bg-muted h-12 flex-1 transition-all duration-200"
    >
      {label}
    </CustomButton>
  );
};

export default PrintButton;
