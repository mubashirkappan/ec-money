import CustomersView from "@/features/admin/customers/CustomersView";
import RoleGuard from "@/features/auth/roleGuard/RoleGuard";

export default function CustomersPage() {
  return (
    <RoleGuard allowedRole="admin">
      <CustomersView />
    </RoleGuard>
  );

}