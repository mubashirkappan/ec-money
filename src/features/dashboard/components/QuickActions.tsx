import ActionCard from "./ActionCard";
import { quickActions } from "../data/dashboard.mock";

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {quickActions.map((action) => (
        <ActionCard
          key={action.id}
          action={action}
        />
      ))}
    </div>
  );
}