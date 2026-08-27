"use client";

import { notFound } from "next/navigation";
import { useEffect } from "react";

import { authCookies } from "@/lib/cookies";
import { useLogout } from "@/lib/auth/logout";

interface RoleGuardProps {
  allowedRole: "superadmin" | "user";
  children: React.ReactNode;
}

export default function RoleGuard({
  allowedRole,
  children,
}: RoleGuardProps) {
  const userType = authCookies.getUserType();
  const accessToken = authCookies.getAccessToken();

  const logout = useLogout();

  useEffect(() => {
    if (!accessToken) {
      logout();
    }
  }, [accessToken, logout]);

  if (!accessToken) { 
    return null;
  }

  if (userType !== allowedRole) {
    notFound();
  }

  return <>{children}</>;
}