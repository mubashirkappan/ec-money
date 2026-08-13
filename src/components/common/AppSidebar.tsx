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
  UserRoundPlus,
  Landmark,
  HandCoins,
  ScrollText,
  PlusCircle
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

          <SidebarGroupLabel className="text-md">
            Main
          </SidebarGroupLabel>

          <SidebarGroupContent>

            <SidebarMenu className="gap-2">

              {/* Dashboard */}

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Dashboard"
                >
                  <Link href="/dashboard">
                    <LayoutDashboard className="size-10"/>
                    <span className="text-lg">Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>


              {/* Payments */}

              {/* <Collapsible
                defaultOpen
                className="group/collapsible"
              >
                <SidebarMenuItem>

                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Payments">

                      <CreditCard />

                      <span className="text-lg">Payments & Transfers</span>

                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />

                    </SidebarMenuButton>
                  </CollapsibleTrigger>


                  <CollapsibleContent>

                    <SidebarMenuSub>

                      <SidebarMenuSubItem>
                        <SidebarMenuButton asChild>
                          <Link href="/dashboard/payments">
                            <PlusCircle />
                            <span>Top Up</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>
                      
                      
                      <SidebarMenuSubItem>
                        <SidebarMenuButton asChild>
                          <Link href="/dashboard/payments">
                            <Landmark />
                            <span>Send Money</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>
                      
                      
                      <SidebarMenuSubItem>
                        <SidebarMenuButton asChild>
                          <Link href="/dashboard/payments">
                            <HandCoins />
                            <span>Request Money</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>


                      <SidebarMenuSubItem>
                        <SidebarMenuButton asChild>
                          <Link href="/dashboard/payments/history">
                            <ScrollText />
                            <span>Pay Bills</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>

                    </SidebarMenuSub>

                  </CollapsibleContent>

                </SidebarMenuItem>
              </Collapsible> */}

              <SidebarMenuItem>

                <SidebarMenuButton
                  asChild
                  tooltip="Transfer Money"
                >
                  <Link href="/payments">

                    <CreditCard />

                    <span className="text-lg">Transfer Money</span>

                  </Link>
                </SidebarMenuButton>

              </SidebarMenuItem>


              {/* Transactions */}

              <SidebarMenuItem>

                <SidebarMenuButton
                  asChild
                  tooltip="Transactions"
                >
                  <Link href="/transactions">

                    <History />

                    <span className="text-lg">Transactions</span>

                  </Link>
                </SidebarMenuButton>

              </SidebarMenuItem>


              {/* Beneficiary */}

              <SidebarMenuItem>

                <SidebarMenuButton
                  asChild
                  tooltip="Beneficiary"
                >
                  <Link href="/beneficiaries">

                    <UserRoundPlus />

                    <span className="text-lg">Beneficiary</span>

                  </Link>
                </SidebarMenuButton>

              </SidebarMenuItem>
              
              {/* Settings */}
              
              <SidebarMenuItem>

                <SidebarMenuButton
                  asChild
                  tooltip="Settings"
                >
                  <Link href="/dashboard/settings">

                    <Settings />

                    <span className="text-lg">Settings</span>

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
                      Adam
                    </span>

                    <span className="truncate text-xs text-slate-300">
                      adam@example.com
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