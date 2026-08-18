import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";

import { QueryProvider } from "@/providers";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { NotificationIcon } from "@/components/layout/notification";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wallet",
  description: "Wallet System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <QueryProvider>{children}</QueryProvider>
        <NotificationIcon />
        <ThemeToggle />
      </body>
    </html>
  );
}