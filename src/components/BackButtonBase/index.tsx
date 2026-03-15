// libs
import { ArrowLeft } from "lucide-react";
// components
import { Button } from "@/components/ui/button";

const BackButtonBase = () => (
  <Button
    variant="ghost"
    size="icon"
    className="absolute left-2 -translate-y-1/2 rounded-full"
  >
    <ArrowLeft className="size-5 text-neutral-600" />
  </Button>
);

export default BackButtonBase;
