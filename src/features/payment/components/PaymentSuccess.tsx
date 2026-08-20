"use client";

import { useRef, useEffect } from 'react';

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  CircleCheckBigIcon,
  type CircleCheckBigIconHandle,
} from "lucide-animated";

export default function PaymentSuccess() {

  const iconRef = useRef<CircleCheckBigIconHandle>(null);

  useEffect(() => {
    // Start immediately
    iconRef.current?.startAnimation();
  }, []);

  return (
    <Card className="border-.5 border-slate-200/70 p-5">
      <CardContent className="grid justify-center space-y-4">
        <h1 className="text-3xl font-medium">Payment Success</h1>
        <CircleCheckBigIcon size={80} ref={iconRef} animateOnHover={false} className="text-green-600 justify-self-center"
        />
      </CardContent>
    </Card>
  );
}