import BeneficiaryView from "@/features/user/beneficiary/BeneficiaryView";
import RoleGuard from "@/features/auth/roleGuard/RoleGuard";

export default function DashboardPage() {
  return (
    <RoleGuard allowedRole="user">
      <BeneficiaryView />
    </RoleGuard>
  );
}