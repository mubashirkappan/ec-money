"use client";

import { notFound } from "next/navigation";
import { useState, useEffect } from "react";

import { authCookies } from "@/lib/cookies";
import { useLogout } from "@/lib/auth/logout";
import { UserRole } from "@/features/auth/types/auth.types";

interface RoleGuardProps {
  allowedRole: UserRole | UserRole[];
  children: React.ReactNode;
}

export default function RoleGuard({
  allowedRole,
  children,
}: RoleGuardProps) {
  const [accessToken] = useState(() => authCookies.getAccessToken());
  const [userType] = useState(
    () => authCookies.getUserType() as UserRole | null
  );

  const logout = useLogout();

  useEffect(() => {
    if (!accessToken) {
      logout();
    }
  }, [accessToken, logout]);

  if (!accessToken) {
    return null;
  }

  const isAllowed = Array.isArray(allowedRole)
    ? allowedRole.includes(userType as UserRole)
    : userType === allowedRole;

  if (!isAllowed) {
    notFound();
  }

  return <>{children}</>;
}