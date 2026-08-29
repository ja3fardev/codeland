"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Search,
  Plus,
  Bell,
  LogOut,
  User,
  Settings,
  Package,
  Home,
  Compass,
  TrendingUp,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-dark-0">
      {/* Top nav */}
      <header className="sticky top-0 z-50 border-b border-dark-200 bg-dark-0/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4 sm:px-6">
          <Link href="/dashboard" className="flex shrink-0 items-center gap-2">
            <Logo size={28} />
          </Link>

          {/* Search */}
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-500" />
            <input
              type="search"
              placeholder="Type / to search"
              className="h-10 w-full rounded-md border border-dark-200 bg-dark-0 pl-9 pr-4 text-sm text-dark-900 placeholder:text-dark-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                }
              }}
            />
            <kbd className="pointer-events-none absolute right-2 top-1/2 hidden h-5 -translate-y-1/2 items-center gap-1 rounded border border-dark-300 bg-dark-100 px-1.5 font-mono text-[10px] text-dark-500 sm:flex">
              /
            </kbd>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="hidden rounded-md px-3 py-1.5 text-sm font-medium text-dark-600 hover:text-dark-900 sm:block"
            >
              Home
            </Link>
            <Link
              href="/explore"
              className="hidden rounded-md px-3 py-1.5 text-sm font-medium text-dark-600 hover:text-dark-900 sm:block"
            >
              Explore
            </Link>
            <Link
              href="/trending"
              className="hidden rounded-md px-3 py-1.5 text-sm font-medium text-dark-600 hover:text-dark-900 sm:block"
            >
              Trending
            </Link>

            <Button
              asChild
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-dark-600 hover:text-dark-900"
            >
              <Link href="/repos/new">
                <Plus className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="relative h-9 w-9 text-dark-600 hover:text-dark-900"
            >
              <Link href="/notifications">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-violet-500" />
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex h-9 items-center gap-1 rounded-md px-1.5"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarImage
                      src={session?.user?.image || undefined}
                      alt=""
                    />
                    <AvatarFallback className="bg-violet-600 text-[10px] text-white">
                      {session?.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-3.5 w-3.5 text-dark-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 border-dark-200 bg-dark-50"
                align="end"
              >
                <div className="p-2">
                  <p className="text-sm font-medium text-dark-900">
                    {session?.user?.name}
                  </p>
                  <p className="text-xs text-dark-500">
                    {(session?.user as any)?.username || session?.user?.email}
                  </p>
                </div>
                <DropdownMenuSeparator className="bg-dark-200" />
                <DropdownMenuItem asChild>
                  <Link
                    href={`/${(session?.user as any)?.username || "demo"}`}
                    className="flex cursor-pointer items-center gap-2 text-dark-700"
                  >
                    <User className="h-4 w-4" />
                    Your profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/repos/new"
                    className="flex cursor-pointer items-center gap-2 text-dark-700"
                  >
                    <Package className="h-4 w-4" />
                    New repository
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/settings"
                    className="flex cursor-pointer items-center gap-2 text-dark-700"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-dark-200" />
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="flex cursor-pointer items-center gap-2 text-red-500"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6">
        {children}
      </main>
    </div>
  );
}
