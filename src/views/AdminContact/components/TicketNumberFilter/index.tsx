"use client";

// types
import type { AdminContactFilterFormValues } from "@/types/ContactAdmin";
// components
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import CustomInput from "@/components/CustomInput";
// hooks
import { useFieldProps } from "@/hooks";
// others
import CONSTANTS from "@/constants";

const { TICKET_NUMBER } =
  CONSTANTS.FIELD_NAMES.ADMIN_CONTACT_FILTER_FIELD_NAMES;

const TicketNumberFilter = ({
  label,
  placeholder
}: {
  label: string;
  placeholder: string;
}) => {
  const { field } = useFieldProps<AdminContactFilterFormValues>(TICKET_NUMBER);
  return (
    <FormField
      {...field}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-muted-foreground text-xs">
            {label}
          </FormLabel>
          <FormControl>
            <CustomInput {...field} placeholder={placeholder} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default TicketNumberFilter;
