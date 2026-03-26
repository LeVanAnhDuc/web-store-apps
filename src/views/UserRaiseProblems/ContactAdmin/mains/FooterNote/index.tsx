const FooterNote = ({ label }: { label: string }) => (
  <div className="bg-muted mt-6 rounded-lg p-4">
    <p className="text-muted-foreground text-center text-sm">{label}</p>
  </div>
);

export default FooterNote;
