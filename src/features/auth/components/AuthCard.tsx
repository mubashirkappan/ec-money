import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AuthCard({
  children,
}: Props) {
  return (
    <Card className="w-full max-w-md rounded-3xl border shadow-xl">
      <CardContent className="p-8">
        {children}
      </CardContent>
    </Card>
  );
}