"use client";

import {
  forwardRef,
  InputHTMLAttributes,
  useState,
} from "react";

import {
  Eye,
  EyeOff,
  LockKeyhole,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface PasswordInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const PasswordInput = forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(
  (
    {
      label,
      error,
      id,
      className,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] =
      useState(false);

    return (
      <div className="!space-y-2">
        <Label
          htmlFor={id}
          className="text-sm font-medium text-slate-700"
        >
          {label}
        </Label>

        <div className="relative">
          <LockKeyhole
            className="pointer-events-none absolute left-2 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400"
          />

          <Input
            ref={ref}
            id={id}
            type={showPassword ? "text" : "password"}
            aria-invalid={!!error}
            className={cn(
              "h-12 rounded-xl border-slate-200 bg-white !px-8 text-sm shadow-none",
              "placeholder:text-slate-400",
              "focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10",
              error &&
                "border-red-400 focus-visible:border-red-500 focus-visible:ring-red-500/10",
              className
            )}
            {...props}
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() =>
              setShowPassword((value) => !value)
            }
            className="absolute right-1 top-1/2 h-10 w-10 -translate-y-1/2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>

        {error && (
          <p className="text-xs font-medium text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;