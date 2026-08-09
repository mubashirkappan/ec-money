import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function DashboardHeader() {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Good Morning 👋
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your wallet and payments efficiently.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
        >
          <Bell className="h-5 w-5" />
        </Button>

        <Avatar className="h-11 w-11">
          <AvatarFallback>MJ</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}