import Link from "next/link";
import { Card } from "@/components/ui/card";
import { QuickAction } from "../types/dashboard.types";

interface Props {
  action: QuickAction;
}

export default function ActionCard({
  action,
}: Props) {
  const Icon = action.icon;

  return (
    <Link href={action.href}>
      <Card className="cursor-pointer rounded-2xl p-5 transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="space-y-3">
          <div className="inline-flex rounded-xl bg-primary/10 p-3">
            <Icon className="h-6 w-6 text-primary" />
          </div>

          <div>
            <h4 className="font-semibold">
              {action.title}
            </h4>

            <p className="text-sm text-muted-foreground">
              {action.description}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}