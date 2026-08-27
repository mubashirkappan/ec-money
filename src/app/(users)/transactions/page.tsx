import TransactionsView from "@/features/user/transactions/TransactionsView";
import RoleGuard from "@/features/auth/roleGuard/RoleGuard";

export default function TransactionsPage() {
  return (
    <RoleGuard allowedRole="user">
      <TransactionsView />
    </RoleGuard>
  );
}