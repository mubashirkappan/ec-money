import ActionCard from "./ActionCard";
import { quickActions } from "@/dummy_db/dashboard.mock";

export default function QuickActions() {
  return (
    // <div className="grid grid-cols-[repeat(2,minmax(0,1fr))] gap-4 xl:grid-cols-[repeat(2,minmax(0,1fr))]">
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