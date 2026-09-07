"use client";

import UserDashboardView from "@/features/user/user_dashboard/UserDashboardView";
import AdminDashboardView from "@/features/admin/admin_dashboard/AdminDashboardView";
import { authCookies } from "@/lib/cookies";
import RoleGuard from "@/features/auth/roleGuard/RoleGuard";

export default function DashboardPage() {
  const userType = authCookies.getUserType();

  return (
    <RoleGuard allowedRole={["user", "superadmin"]}>
      {userType === "superadmin" ? (
        <AdminDashboardView />
      ) : (
        <UserDashboardView />
      )}
    </RoleGuard>
  );
}