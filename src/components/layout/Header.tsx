import { Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-background px-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Welcome back 👋
        </p>
      </div>

      <button className="rounded-full border p-3 hover:bg-accent">
        <Bell className="h-5 w-5" />
      </button>
    </header>
  );
}