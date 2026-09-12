import ActionCard from "./ActionCard";
import { adminQuickActions } from "@/dummy_db/dashboard.mock";
import { Card, CardTitle } from "@/components/ui/card";

export default function QuickActions() {
  return (
    <Card className="p-5">
      <CardTitle>
        Quick Actions
      </CardTitle>
      <div className="grid h-full grid-cols-2 gap-4">
        {adminQuickActions.map((action) => (
          <ActionCard
            key={action.id}
            action={action}
          />
        ))}
      </div>
    </Card>
  );
}