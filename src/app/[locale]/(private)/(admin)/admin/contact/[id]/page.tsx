// views
import AdminContactDetail from "@/views/AdminContacts/AdminContactDetail";

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AdminContactDetail id={id} />;
}
