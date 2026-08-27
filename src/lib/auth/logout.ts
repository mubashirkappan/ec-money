"use client";

import { useRouter } from "next/navigation";
import { authCookies } from "../cookies";

export function useLogout() {

  const router = useRouter();

  const logout = () => {
    authCookies.clear();
    router.replace("/login");
  };

  return logout;
}