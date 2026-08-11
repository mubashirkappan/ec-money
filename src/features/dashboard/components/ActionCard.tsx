import Link from "next/link";
import { Card } from "@/components/ui/card";
import { QuickAction } from "../types/dashboard.types";

interface Props {
  action: QuickAction;
}

export default function ActionCard({
  action,
}: Props) {

  return (
    <Link href={action.href}>
      <Card className="cursor-pointer p-5 transition-all hover:shadow-lg hover:-translate-y-1 hover:bg-slate-100/20">
        <div className="space-y-3 grid justify-center items-center text-center">
          <div className="flex justify-center w-full">
            <div className="flex items-center justify-center size-12 bg-emerald-100 text-emerald-600 rounded-xl">
              <action.icon className="size-6" />
            </div>
          </div>

          <div>
            <h4 className="font-semibold whitespace-nowrap">
              {action.title}
            </h4>

            <p className="text-sm text-muted-foreground whitespace-nowrap">
              {action.description}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}