import { Wallet } from "lucide-react";

export default function Logo() {
  return (
    <div className="relative z-10 flex items-center gap-3">
      <div className="grid place-items-center w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-400 to-emerald-300 shadow-lg shadow-indigo-500/30">
        <Wallet className="w-6 h-6 text-[#0B0F1A]" />
      </div>
      <span className="text-lg font-semibold tracking-tight">Wallet Pay</span>
    </div>
  );
}