import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";

import { QueryProvider } from "@/providers";

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
      </body>
    </html>
  );
}