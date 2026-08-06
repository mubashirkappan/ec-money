import { ReactNode } from "react";
import AppLayout from "@/components/layout/AppLayout";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: Props) {
  return <AppLayout>{children}</AppLayout>;
}