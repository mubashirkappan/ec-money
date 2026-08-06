import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type Variant =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "title"
  | "body"
  | "caption";

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: Variant;
  as?: keyof JSX.IntrinsicElements;
}

const styles: Record<Variant, string> = {
  display:
    "text-5xl font-bold tracking-tight",

  h1:
    "text-4xl font-bold",

  h2:
    "text-3xl font-semibold",

  h3:
    "text-2xl font-semibold",

  title:
    "text-xl font-semibold",

  body:
    "text-base text-slate-600",

  caption:
    "text-sm text-slate-500",
};

export function Typography({
  as = "p",
  variant = "body",
  className,
  children,
  ...props
}: TypographyProps) {
  const Component = as;

  return (
    <Component
      className={cn(styles[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
}