import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: Props) {
  return (
    <main className="min-h-screen bg-muted">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left */}
        <section className="hidden bg-primary text-primary-foreground lg:flex">
          <div className="flex w-full flex-col justify-between p-16">
            <div>
              <h1 className="text-4xl font-bold">
                Wallet
              </h1>

              <p className="mt-4 text-lg opacity-90">
                Modern Digital Payment Platform
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-6xl font-bold leading-tight">
                Secure.
                <br />
                Fast.
                <br />
                Reliable.
              </h2>

              <p className="max-w-lg text-lg opacity-90">
                Send money, receive payments and
                manage your wallet with confidence.
              </p>
            </div>

            <div className="text-sm opacity-80">
              © 2026 Wallet
            </div>
          </div>
        </section>

        {/* Right */}
        <section className="flex items-center justify-center p-6">
          {children}
        </section>
      </div>
    </main>
  );
}