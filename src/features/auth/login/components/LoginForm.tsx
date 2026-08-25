"use client";

import Link from "next/link";
import {
  User2Icon,
  ShieldCheck,
  LockKeyhole
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  loginSchema,
  LoginFormValues,
} from "../schemas/login.schema";

import AppInput from "@/components/common/AppInput";
import SecureInput from "@/components/common/SecureInput";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface LoginFormProps {
  onPageLoading: (loading: boolean) => void;
}

export default function LoginForm({
  onPageLoading,
}: LoginFormProps) {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email_or_mobile: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: LoginFormValues) {
    onPageLoading(true);

    try {
      console.log("Frontend login:", values);

      // API request here
      await new Promise((resolve) =>
        setTimeout(resolve, 1200)
      );

      const loginSuccess = true; // API result

      if (loginSuccess) {
        router.push("/dashboard");
      } else {
        onPageLoading(false);
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      onPageLoading(false);
      router.push("/login");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <AppInput
        id="username"
        label="Username"
        placeholder="Enter email or mobile number"
        icon={User2Icon}
        error={errors.email_or_mobile?.message}
        {...register("email_or_mobile")}
      />

      <SecureInput
        id="password"
        label="Password"
        placeholder="Enter your password"
        icon={LockKeyhole}
        autoComplete="current-password"
        error={errors.password?.message}
        {...register("password")}
      />

      <div className="flex items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-2">
          <Checkbox
            id="rememberMe"
            checked={watch("rememberMe")}
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
        className="h-12 w-full rounded-xl bg-blue-600 text-sm font-semibold shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-blue-600/30 text-white"
      >
        Sign in
      </Button>

      <div className="flex items-center justify-center gap-2 pt-3 text-xs text-slate-400">
        <ShieldCheck className="h-4 w-4" />

        <span>
          Your information is securely protected
        </span>
      </div>
    </form>
  );
}