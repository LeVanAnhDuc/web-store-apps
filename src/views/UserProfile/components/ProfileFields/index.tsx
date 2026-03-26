const ProfileFields = ({
  fields
}: {
  fields: { label: string; value: string | null }[];
}) => (
  <div className="mt-6 divide-y">
    {fields.map(({ label, value }) => (
      <div key={label} className="flex items-center justify-between py-3">
        <span className="text-muted-foreground text-sm">{label}</span>
        <span className="text-foreground text-sm font-medium">
          {value ?? "—"}
        </span>
      </div>
    ))}
  </div>
);

export default ProfileFields;
