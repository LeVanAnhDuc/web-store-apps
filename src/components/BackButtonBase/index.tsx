// libs
import { ArrowLeft } from "lucide-react";
// components
import { Button } from "@/components/ui/button";

const BackButtonBase = () => (
  <Button
    variant="ghost"
    size="icon"
    className="absolute top-4 left-4 rounded-full"
  >
    <ArrowLeft className="h-5 w-5" />
  </Button>
);

export default BackButtonBase;
