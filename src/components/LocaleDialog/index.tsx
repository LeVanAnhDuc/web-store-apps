// libs
import { Globe } from "lucide-react";
// components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import LocaleDialogContent from "./mains/LocaleDialogContent";
import CustomButton from "../CustomButton";

const LocaleDialog = () => (
  <Dialog>
    <DialogTrigger asChild>
      <CustomButton
        className="size-9 rounded-full border-1 has-[>svg]:p-2.5"
        variant={"outline"}
      >
        <Globe className="text-primary size-4" />
      </CustomButton>
    </DialogTrigger>
    <DialogContent className="w-5xl sm:max-w-[calc(100%-2rem)]">
      <DialogHeader>
        <DialogTitle />
      </DialogHeader>
      <LocaleDialogContent />
    </DialogContent>
  </Dialog>
);

export default LocaleDialog;
