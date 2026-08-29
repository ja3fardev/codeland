"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Search,
  Menu,
  X,
  LogOut,
  User,
  Settings,
  TrendingUp,
  Compass,
  Bell,
  Plus,
  Package,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

const navLinks = [
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/trending", label: "Trending", icon: TrendingUp },
];

export function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-dark-200 bg-dark-0/95 backdrop-blur supports-[backdrop-filter]:bg-dark-0/80">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo + Desktop Nav */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-all hover:opacity-80"
          >
            <Logo size={28} />
            <span className="hidden text-xl font-bold tracking-tight sm:inline-block">
              <span className="text-dark-900">Code</span>
              <span className="text-violet-400">Land</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-dark-200 text-dark-900"
                      : "text-dark-600 hover:bg-dark-100 hover:text-dark-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Center: Search */}
        <form
          onSubmit={handleSearch}
          className="hidden max-w-md flex-1 px-4 md:block"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-500" />
            <Input
              type="search"
              placeholder="Search or jump to..."
              className="w-full rounded-md border-dark-200 bg-dark-100 pl-9 text-sm text-dark-900 placeholder:text-dark-500 focus:border-violet-500 focus:ring-violet-500/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <kbd className="pointer-events-none absolute right-2 top-1/2 hidden h-5 -translate-y-1/2 select-none items-center gap-1 rounded border border-dark-300 bg-dark-200 px-1.5 font-mono text-[10px] font-medium text-dark-500 sm:flex">
              /
            </kbd>
          </div>
        </form>

        {/* Right: User actions */}
        <div className="flex items-center gap-2">
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="hidden rounded-md px-3 py-1.5 text-sm font-medium text-dark-600 hover:bg-dark-100 hover:text-dark-900 sm:block"
              >
                Dashboard
              </Link>
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="hidden text-dark-600 hover:text-dark-900 sm:flex"
              >
                <Link href="/repos/new">
                  <Plus className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="hidden text-dark-600 hover:text-dark-900 sm:flex"
              >
                <Link href="/notifications">
                  <Bell className="h-5 w-5" />
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={session.user?.image || undefined}
                        alt={session.user?.name || "User"}
                      />
                      <AvatarFallback className="bg-violet-600 text-xs text-white">
                        {session.user?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 border-dark-200 bg-dark-50"
                  align="end"
                  forceMount
                >
                  <div className="flex items-center gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={session.user?.image || undefined}
                        alt={session.user?.name || "User"}
                      />
                      <AvatarFallback className="bg-violet-600 text-xs text-white">
                        {session.user?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-dark-900">
                        {session.user?.name}
                      </p>
                      <p className="text-xs text-dark-500">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-dark-200" />
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard"
                    className="flex cursor-pointer items-center gap-2 text-dark-700"
                  >
                    <User className="h-4 w-4" />
                    Dashboard
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
                    onClick={() => signOut()}
                    className="flex cursor-pointer items-center gap-2 text-red-500"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-dark-600 hover:text-dark-900"
              >
                <Link href="/login">Sign in</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-green-600 text-white hover:bg-green-700"
              >
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-dark-200 bg-dark-0 md:hidden">
          <div className="space-y-1 px-4 pb-4 pt-2">
            <form onSubmit={handleSearch} className="mb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-500" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full border-dark-200 bg-dark-100 pl-9 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>

            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-dark-200 text-dark-900"
                      : "text-dark-600 hover:bg-dark-100 hover:text-dark-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}

            {!session && (
              <div className="flex flex-col gap-2 pt-3 border-t border-dark-200 mt-3">
                <Button asChild variant="outline" className="w-full border-dark-300">
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                  <Link href="/register">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
