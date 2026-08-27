import PaymentView from "@/features/user/payment/PaymentView";
import RoleGuard from "@/features/auth/roleGuard/RoleGuard";

export default function PaymentPage() {
  return (
    <RoleGuard allowedRole="user">
      <PaymentView />
    </RoleGuard>
  );
}