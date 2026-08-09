"use client";

import { useState } from "react";
import AuthHero from "@/features/auth/login/components/AuthHero";
import LoginForm from "@/features/auth/login/components/LoginForm";
import AppLayout from "@/components/layout/AppLayout";
import PageLoading from "@/components/common/PageLoading";

import { Wallet } from 'lucide-react'

export default function LoginPage() {

  const [isPageLoading, setIsPageLoading] = useState(false);

  if (isPageLoading) {
    return (
      <AppLayout>
        <PageLoading />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
        
        <AuthHero />

        <div className="flex flex-col min-h-screen lg:min-h-0 lg:justify-center !px-5 !py-10 sm:!px-8 lg:!px-16 xl:!px-24">
          
          <div className="!mx-auto w-full max-w-md">

            <div className="lg:hidden flex items-center gap-3 !mb-10">
              <div className="grid place-items-center w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-400 to-emerald-300 shadow-lg shadow-indigo-500/30">
                <Wallet className="w-6 h-6 text-[#0B0F1A]" />
              </div>
              <span className="text-lg font-semibold tracking-tight">Wallet Pay</span>
            </div>
            
            <div className="!mb-6">
              <h2 className="text-3xl font-semibold tracking-tight">Welcome back</h2>
              <p className="text-muted-foreground mt-2">
                Log in to access your wallet.
              </p>
            </div>

            <LoginForm onPageLoading={setIsPageLoading}/>
          </div>

        </div>  

      </div>
    </AppLayout>
  );
}