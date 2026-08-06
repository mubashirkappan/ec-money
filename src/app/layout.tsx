import type { Metadata } from "next";
import "./globals.css";

import { QueryProvider } from "@/providers";

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
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}