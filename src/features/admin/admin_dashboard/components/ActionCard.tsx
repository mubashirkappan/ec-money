import Link from "next/link";
import { QuickActionTypes } from "../types/dashboard.types";

interface Props {
  action: QuickActionTypes;
}

export default function ActionCard({
  action,
}: Props) {

  return (
    <Link href={action.href} className="h-full">
      <div className="h-full cursor-pointer p-5 border rounded-xl transition-all hover:shadow-lg hover:-translate-y-1 hover:bg-slate-100/20">
        <div className="flex h-full flex-col items-center justify-center space-y-3 text-center">
          <div className="flex justify-center items-center w-full">
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
      </div>
    </Link>
  );
}