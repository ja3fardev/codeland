"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Code,
  CircleDot,
  GitPullRequest,
  Workflow,
  LayoutGrid,
  BookOpen,
  Settings,
} from "lucide-react";

interface SidebarProps {
  repoName: string;
  repoDescription?: string;
}

const navItems = [
  { href: "", label: "Code", icon: Code },
  { href: "/issues", label: "Issues", icon: CircleDot },
  { href: "/pulls", label: "Pull Requests", icon: GitPullRequest },
  { href: "/actions", label: "Actions", icon: Workflow },
  { href: "/projects", label: "Projects", icon: LayoutGrid },
  { href: "/wiki", label: "Wiki", icon: BookOpen },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ repoName, repoDescription }: SidebarProps) {
  const pathname = usePathname();
  const basePath = `/${repoName}`;

  return (
    <aside className="w-64 shrink-0 border-r border-border">
      <div className="sticky top-16 space-y-4 overflow-y-auto p-4">
        {/* Repo info */}
        <div className="space-y-1">
          <h2 className="text-lg font-semibold leading-tight">{repoName}</h2>
          {repoDescription && (
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {repoDescription}
            </p>
          )}
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const href = `${basePath}${item.href}`;
            const fullHref = item.href ? href : basePath;
            const isActive =
              item.href === ""
                ? pathname === basePath
                : pathname.startsWith(href);

            return (
              <Link
                key={item.href}
                href={fullHref}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
