import UserDashboardView from "@/features/user/user_dashboard/UserDashboardView";
import AdminDashboardView from "@/features/admin/admin_dashboard/AdminDashboardView";
import { authCookies } from "@/lib/cookies"

export default function DashboardPage() {

  return authCookies.getUserType() === "superadmin" ? <AdminDashboardView/> : <UserDashboardView />;
  
}