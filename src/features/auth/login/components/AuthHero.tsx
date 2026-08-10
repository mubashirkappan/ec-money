import Logo from "./Logo";
import {
  ShieldCheck,
  Wallet,
  Zap,
  ArrowRight
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Bank-Grade Security",
    description:
      "Your transactions are protected using enterprise-grade encryption.",
  },
  {
    icon: Wallet,
    title: "Digital Wallet",
    description:
      "Send and receive money instantly from anywhere.",
  },
  {
    icon: Zap,
    title: "Instant Payments",
    description:
      "Lightning-fast transactions with real-time updates.",
  },
];

export default function AuthHero() {
  return (
    <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-[#0B0F1A] p-10 xl:p-14 text-white">

      <div className="pointer-events-none absolute -top-32 -left-24 w-96 h-96 rounded-full bg-indigo-500/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:44px_44px]" />
      
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="relative z-10">
        <Logo />

        <p className="text-sm font-medium text-emerald-300/90 mt-12 mb-4">The digital wallet built for modern money</p>

        <h1 className="text-4xl xl:text-5xl font-semibold tracking-tight leading-[1.1] mt-12">
          Your money,
          <br />
          <span className="bg-gradient-to-r from-indigo-300 via-white to-emerald-300 bg-clip-text text-transparent">
            beautifully in control.
          </span>
        </h1>

        <p className="mt-5 text-white/70 leading-relaxed">
          Secure wallet, instant transfers,
          transaction history and complete
          financial control in one place.
        </p>

        <ul className="mt-16 space-y-6">
          {features.map((f) => (
            <li key={f.title} className="flex gap-4">
              <div className="grid place-items-center w-11 h-11 shrink-0 rounded-xl bg-white/10 ring-1 ring-white/15 backdrop-blur">
                <f.icon className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <p className="font-medium">{f.title}</p>
                <p className="text-sm text-white/60 mt-0.5 leading-relaxed">
                  {f.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative z-10 flex items-center justify-between text-sm text-white/50 border-t border-white/10 pt-6">
        <span>Trusted by 2M+ people worldwide</span>
        <span className="flex items-center gap-1.5">
          Learn more <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </aside>
  );
}