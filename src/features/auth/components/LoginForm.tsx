"use client";

import { useState } from "react";
import Link from "next/link";

import { Eye, EyeOff, LoaderCircle } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLogin } from '@/features/auth/hooks/useLogin'

import {
  loginSchema,
  LoginFormData,
} from "../schemas/login.schema";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useLogin();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  async function onSubmit(data: LoginFormData) {
      try {

          const response =
              await loginMutation.mutateAsync(data);

          console.log(response);

      } catch (error) {

          console.error(error);

      }
  }

  return (
    <Card className="w-full max-w-md rounded-3xl border shadow-xl">
      <CardContent className="space-y-8 p-8">

        <div className="space-y-2">
          <h2 className="text-3xl font-bold">
            Welcome Back
          </h2>

          <p className="text-muted-foreground">
            Sign in to your account
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>

                  <FormControl>
                    <div className="relative">
                      <Input
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        placeholder="Enter your password"
                        {...field}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((v) => !v)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <Eye className="h-5 w-5 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="remember"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />

                    <FormLabel className="font-normal">
                      Remember me
                    </FormLabel>
                  </FormItem>
                )}
              />

              <Link
                href="/forgot-password"
                className="text-sm font-medium text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="h-12 w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-primary hover:underline"
          >
            Create Account
          </Link>
        </div>

      </CardContent>
    </Card>
  );
}