import { Wallet } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
        <Wallet size={24} />
      </div>

      <div>
        <h2 className="text-xl font-bold">
          Wallet
        </h2>

        <p className="text-sm text-slate-500">
          Payment Platform
        </p>
      </div>
    </div>
  );
}