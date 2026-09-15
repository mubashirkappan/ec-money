import CustomerDetailsView from "@/features/admin/customers/CustomerDetailsView";
import RoleGuard from "@/features/auth/roleGuard/RoleGuard";

interface CustomerPageProps {
  params: Promise<{
    cid: string;
  }>;
}

export default async function CustomerPage({
  params,
}: CustomerPageProps) {
  const { cid } = await params;

  return (
    <RoleGuard allowedRole="admin">
      <CustomerDetailsView customerId={cid} />
    </RoleGuard>
  );
}