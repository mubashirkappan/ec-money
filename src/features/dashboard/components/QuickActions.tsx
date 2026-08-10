import ActionCard from "./ActionCard";
import { quickActions } from "@/dummy_db/dashboard.mock";

export default function QuickActions() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {quickActions.map((action) => (
        <ActionCard
          key={action.id}
          action={action}
        />
      ))}
    </div>
  );
}