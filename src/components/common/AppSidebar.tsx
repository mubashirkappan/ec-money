"use client";

import Link from "next/link";
import {
  ChevronDown,
  CreditCard,
  History,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
  Wallet,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { env } from '@/lib/env'

export function AppSidebar() {
  return (
    <Sidebar
      collapsible="icon"
    >

    {/* ================= HEADER ================= */}

      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              tooltip={env.appName}
            >
              <Link href="/dashboard">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-indigo-400 to-emerald-300 text-black">
                    <Wallet className="size-4" />
                  </div>
                  <div>
                    <span className="truncate font-semibold">{env.appName}</span>
                  </div>

              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>


      {/* ================= CONTENT ================= */}

      <SidebarContent>

        <SidebarGroup>

          <SidebarGroupLabel>
            Main
          </SidebarGroupLabel>

          <SidebarGroupContent>

            <SidebarMenu>

              {/* Dashboard */}

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Dashboard"
                >
                  <Link href="/dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>


              {/* Payments */}

              <Collapsible
                defaultOpen
                className="group/collapsible"
              >
                <SidebarMenuItem>

                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Payments">

                      <CreditCard />

                      <span>Payments</span>

                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />

                    </SidebarMenuButton>
                  </CollapsibleTrigger>


                  <CollapsibleContent>

                    <SidebarMenuSub>

                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/dashboard/payments">
                            <span>Make Payment</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>


                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/dashboard/payments/history">
                            <span>Payment History</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>

                    </SidebarMenuSub>

                  </CollapsibleContent>

                </SidebarMenuItem>
              </Collapsible>


              {/* Transactions */}

              <Collapsible className="group/collapsible">

                <SidebarMenuItem>

                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Transactions">

                      <History />

                      <span>Transactions</span>

                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />

                    </SidebarMenuButton>
                  </CollapsibleTrigger>


                  <CollapsibleContent>

                    <SidebarMenuSub>

                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/dashboard/transactions">
                            <span>All Transactions</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>


                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/dashboard/transactions/income">
                            <span>Income</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>


                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/dashboard/transactions/expenses">
                            <span>Expenses</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>

                    </SidebarMenuSub>

                  </CollapsibleContent>

                </SidebarMenuItem>

              </Collapsible>


              {/* Settings */}

              <SidebarMenuItem>

                <SidebarMenuButton
                  asChild
                  tooltip="Settings"
                >
                  <Link href="/dashboard/settings">

                    <Settings />

                    <span>Settings</span>

                  </Link>
                </SidebarMenuButton>

              </SidebarMenuItem>

            </SidebarMenu>

          </SidebarGroupContent>

        </SidebarGroup>

      </SidebarContent>


      {/* ================= FOOTER / PROFILE ================= */}

      <SidebarFooter>

        <SidebarMenu>

          <SidebarMenuItem>

            <DropdownMenu>

              <DropdownMenuTrigger asChild>

                <SidebarMenuButton
                  size="lg"
                  tooltip="John Doe"
                >

                  {/* Avatar */}

                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-black">

                    <User className="size-4" />

                  </div>


                  {/* User information */}

                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">

                    <span className="truncate font-semibold">
                      John Doe
                    </span>

                    <span className="truncate text-xs text-slate-300">
                      john@example.com
                    </span>

                  </div>


                  <ChevronDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />

                </SidebarMenuButton>

              </DropdownMenuTrigger>


              <DropdownMenuContent
                side="right"
                align="end"
                className="w-56"
              >

                <DropdownMenuLabel>
                  My Account
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <User />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Settings />
                  Settings
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-destructive">
                  <LogOut />
                  Logout
                </DropdownMenuItem>

              </DropdownMenuContent>

            </DropdownMenu>

          </SidebarMenuItem>

        </SidebarMenu>

      </SidebarFooter>
    </Sidebar>
  );
}