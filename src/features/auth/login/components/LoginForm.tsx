"use client";

import Link from "next/link";
import {
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  loginSchema,
  LoginFormValues,
} from "../schemas/login.schema";

import AppInput from "@/components/common/AppInput";
import PasswordInput from "@/components/common/PasswordInput";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: LoginFormValues) {
    console.log("Frontend login:", values);

    await new Promise((resolve) =>
      setTimeout(resolve, 1200)
    );

    router.push("/dashboard");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="!space-y-4"
    >
      <AppInput
        id="username"
        label="Username"
        placeholder="Enter email or mobile number"
        error={errors.username?.message}
        {...register("username")}
      />

      <PasswordInput
        id="password"
        label="Password"
        placeholder="Enter your password"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register("password")}
      />

      <div className="flex items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-2">
          <Checkbox
            id="rememberMe"
            {...register("username")}
            onCheckedChange={(checked) =>
              setValue(
                "rememberMe",
                checked === true
              )
            }
          />

          <Label
            htmlFor="rememberMe"
            className="cursor-pointer text-sm font-normal text-slate-600"
          >
            Remember me
          </Label>
        </div>

        <Link
          href="/forgot-password"
          className="text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-xl bg-blue-600 text-sm font-semibold shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-blue-600/30"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Signing in...
          </span>
        ) : (
          "Sign in"
        )}
      </Button>

      <div className="flex items-center justify-center gap-1 pt-2 text-sm">
        <span className="text-slate-500">
          Don&rsquo;t have an account?
        </span>

        <Link
          href="/register"
          className="font-semibold text-blue-600 hover:text-blue-700"
        >
          Create One
        </Link>
      </div>

      <div className="flex items-center justify-center gap-2 pt-3 text-xs text-slate-400">
        <ShieldCheck className="h-4 w-4" />

        <span>
          Your information is securely protected
        </span>
      </div>
    </form>
  );
}