import WalletCreditView from "@/features/admin/wallet_credit/WalletCreditView";
import RoleGuard from "@/features/auth/roleGuard/RoleGuard";

export default function WalletCreditPage() {
  return (
    <RoleGuard allowedRole="admin">
      <WalletCreditView />
    </RoleGuard>
  );
}