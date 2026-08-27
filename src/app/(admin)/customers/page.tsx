import CustomersView from "@/features/admin/customers/CustomersView";
import RoleGuard from "@/features/auth/roleGuard/RoleGuard";

export default function PaymentPage() {
  return (
    <RoleGuard allowedRole="superadmin">
      <CustomersView />
    </RoleGuard>
  );

}