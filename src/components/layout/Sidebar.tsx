"use client";

import Link from "next/link";
import { LayoutDashboard, Wallet, CreditCard, History, Settings } from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Wallet",
    href: "/wallet",
    icon: Wallet,
  },
  {
    title: "Payments",
    href: "/payments",
    icon: CreditCard,
  },
  {
    title: "History",
    href: "/history",
    icon: History,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-72 border-r bg-background lg:flex lg:flex-col">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold">Wallet</h1>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-accent"
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}