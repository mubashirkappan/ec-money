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
      <Card className="cursor-pointer p-5 transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="space-y-3 grid justify-center items-center text-center">
          <div className="flex justify-center w-full">
            <div className="flex items-center justify-center size-12 bg-black rounded-xl">
              <action.icon className="size-6 text-white" />
            </div>
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