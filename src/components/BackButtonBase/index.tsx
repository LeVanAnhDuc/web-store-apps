// libs
import { ArrowLeft } from "lucide-react";
// components
import { Button } from "@/components/ui/button";

const BackButtonBase = () => (
  <Button
    variant="ghost"
    size="icon"
    className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full"
  >
    <ArrowLeft className="h-5 w-5" />
  </Button>
);

export default BackButtonBase;
