"use client";

import {
  forwardRef,
  InputHTMLAttributes,
  useState,
  ElementType
} from "react";

import {
  Eye,
  EyeOff,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface SecureInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: ElementType;
  focusTextView ?: boolean;
}

const SecureInput = forwardRef<
  HTMLInputElement,
  SecureInputProps
>(
  (
    {
      label,
      error,
      icon: Icon,
      id,
      focusTextView = false,
      className,
      ...props
    },
    ref
  ) => {

    const [showSecured, setShowSecured] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="space-y-2">
        <Label
          htmlFor={id}
          className="text-sm font-medium text-slate-700"
        >
          {label}
        </Label>

        <div className="relative">
          {Icon && (
            <Icon
              className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400"
            />
          )}

          <Input
            ref={ref}
            id={id}
            type={
              focusTextView
                ? isFocused
                  ? "text"
                  : "password"
                : showSecured
                  ? "text"
                  : "password"
            }
            aria-invalid={!!error}
            className={cn(
              "h-12 rounded-xl border-slate-200 bg-white text-sm shadow-none",
              "placeholder:text-slate-400",
              "focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10",
              Icon ? "pl-8" : "px-4",
              focusTextView ? "pr-4" : "pr-11",
              error &&
                "border-red-400 focus-visible:border-red-500 focus-visible:ring-red-500/10",
              className
            )}
            {...props}
            onFocus={(event) => {
              setIsFocused(true);
              props.onFocus?.(event);
            }}
            onBlur={(event) => {
              setIsFocused(false);
              props.onBlur?.(event);
            }}
          />

          { !focusTextView
            ?
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() =>
                  setShowSecured((value) => !value)
                }
                className="absolute right-1 top-1/2 h-10 w-10 -translate-y-1/2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label={
                  showSecured
                    ? "Hide text"
                    : "Show text"
                }
              >
                {showSecured ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>

            : null
          }
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

SecureInput.displayName = "SecureInput";

export default SecureInput;