"use client";

import {
  forwardRef,
  InputHTMLAttributes,
  ElementType,
} from "react";

// import {
//   User2Icon,
// } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { colors } from "@/design/tokens/colors";

interface AppInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ElementType;
}

const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  (
    {
      label,
      error,
      icon: Icon,
      className,
      id,
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-2">
        {label && (
          <Label
            htmlFor={id}
            className="text-sm font-medium"
            style={{ color: colors.text }}
          >
            {label}
          </Label>
        )}

        <div className="relative">
          {Icon && (
            <Icon
              className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400"
            />
          )}

          <Input
            ref={ref}
            id={id}
            {...props}
            className={cn(
              "h-12 rounded-xl border-slate-200 text-sm shadow-none",
              "placeholder:text-slate-400",
              "focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10",
              Icon ? "pl-8 pr-4" : "px-4",
              error &&
                "border-red-400 focus-visible:border-red-500 focus-visible:ring-red-500/10",
              className
            )}
            aria-invalid={!!error}
          />
        </div>

        {error && (
          <p
            className="text-xs font-medium"
            style={{ color: colors.danger }}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

AppInput.displayName = "AppInput";

export default AppInput;