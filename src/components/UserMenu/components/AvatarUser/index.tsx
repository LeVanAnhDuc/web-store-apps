// libs
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// others
import { cn } from "@/libs/utils";

const AvatarUser = ({ className }: { className?: string }) => (
  <Avatar className={cn("ring-border size-9 cursor-pointer ring-2", className)}>
    <AvatarImage src="" alt="User Avatar" />
    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
      DC
    </AvatarFallback>
  </Avatar>
);

export default AvatarUser;
