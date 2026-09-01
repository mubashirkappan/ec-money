import { Wallet } from "lucide-react";
import { env } from "@/lib/env";
import Image from "next/image";
import logo from "@/assets/images/logo.png"

export default function Logo() {
  return (
    <div className="relative z-10 flex items-center gap-2">
      <Image
        src={logo}
        alt="World Trade Transfer"
        className="size-16"
      />
      <span className="text-lg font-semibold tracking-tight">{env.appName}</span>
    </div>
  );
}