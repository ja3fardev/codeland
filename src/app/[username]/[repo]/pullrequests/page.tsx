"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Plus,
  Search,
  GitPullRequest,
  CheckCircle2,
  XCircle,
  MessageSquare,
  GitBranch,
  Filter,
} from "lucide-react";

const mockPRs = [
  {
    number: 28,
    title: "feat: implement user authentication with JWT",
    author: "jane_smith",
    branch: "feature/auth",
    base: "main",
    state: "open" as const,
    date: "1 day ago",
    comments: 7,
    additions: 342,
    deletions: 45,
  },
  {
    number: 27,
    title: "fix: resolve memory leak in WebSocket handler",
    author: "mike_chen",
    branch: "fix/websocket-leak",
    base: "develop",
    state: "open" as const,
    date: "2 days ago",
    comments: 3,
    additions: 28,
    deletions: 12,
  },
  {
    number: 26,
    title: "refactor: migrate to App Router",
    author: "sarah_dev",
    branch: "refactor/app-router",
    base: "main",
    state: "merged" as const,
    date: "3 days ago",
    comments: 15,
    additions: 1205,
    deletions: 892,
  },
  {
    number: 25,
    title: "chore: update dependencies to latest versions",
    author: "john_doe",
    branch: "chore/deps-update",
    base: "main",
    state: "merged" as const,
    date: "5 days ago",
    comments: 2,
    additions: 156,
    deletions: 89,
  },
  {
    number: 24,
    title: "feat: add dark mode support",
    author: "alex_ops",
    branch: "feature/dark-mode",
    base: "main",
    state: "closed" as const,
    date: "1 week ago",
    comments: 10,
    additions: 456,
    deletions: 123,
  },
];

function RepoTabs({ username, repo, activeTab }: { username: string; repo: string; activeTab: string }) {
  const tabs = [
    { label: "Code", href: `/${username}/${repo}`, id: "code" },
    { label: "Issues", href: `/${username}/${repo}/issues`, id: "issues", count: 12 },
    { label: "Pull Requests", href: `/${username}/${repo}/pullrequests`, id: "pulls", count: 5 },
    { label: "Actions", href: `/${username}/${repo}/actions`, id: "actions" },
    { label: "Projects", href: `/${username}/${repo}/projects`, id: "projects" },
    { label: "Wiki", href: `/${username}/${repo}/wiki`, id: "wiki" },
    { label: "Settings", href: `/${username}/${repo}/settings`, id: "settings" },
  ];

  return (
    <nav className="flex items-center gap-1 border-b border-border overflow-x-auto">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={tab.href}
          className={`flex items-center gap-1.5 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? "border-brand-600 text-foreground"
              : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
          }`}
        >
          {tab.label}
          {"count" in tab && tab.count !== undefined && (
            <span className="ml-1 rounded-full bg-surface-200 px-2 py-0.5 text-xs font-semibold text-surface-700 dark:bg-dark-300 dark:text-dark-700">
              {tab.count}
            </span>
          )}
        </Link>
      ))}
    </nav>
  );
}

function PRStateIcon({ state }: { state: "open" | "closed" | "merged" }) {
  if (state === "merged") {
    return <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-purple-600" />;
  }
  if (state === "open") {
    return <GitPullRequest className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />;
  }
  return <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />;
}

function PRStateBadge({ state }: { state: "open" | "closed" | "merged" }) {
  const styles = {
    open: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    closed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    merged: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${styles[state]}`}>
      {state.charAt(0).toUpperCase() + state.slice(1)}
    </span>
  );
}

export default function PullRequestsPage({
  params,
}: {
  params: Promise<{ username: string; repo: string }>;
}) {
  const [username, setUsername] = useState("");
  const [repo, setRepo] = useState("");
  const [filter, setFilter] = useState<"open" | "closed" | "merged">("open");
  const [searchQuery, setSearchQuery] = useState("");

  params.then((p) => { setUsername(p.username); setRepo(p.repo); });

  const filteredPRs = mockPRs.filter((pr) => {
    if (filter === "merged" && pr.state !== "merged") return false;
    if (filter === "open" && pr.state !== "open") return false;
    if (filter === "closed" && pr.state !== "closed") return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        pr.title.toLowerCase().includes(q) ||
        pr.author.toLowerCase().includes(q) ||
        pr.branch.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const openCount = mockPRs.filter((pr) => pr.state === "open").length;
  const closedCount = mockPRs.filter((pr) => pr.state === "closed").length;
  const mergedCount = mockPRs.filter((pr) => pr.state === "merged").length;

  return (
    <div className="flex min-h-0 flex-1">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-border overflow-y-auto">
        <div className="sticky top-16 space-y-4 p-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold leading-tight">{repo || "repo"}</h2>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              A revolutionary developer platform
            </p>
          </div>

          <nav className="space-y-1">
            {[
              { label: "Code", href: `/${username || "user"}/${repo || "repo"}`, active: false },
              { label: "Issues", href: `/${username || "user"}/${repo || "repo"}/issues`, active: false },
              { label: "Pull Requests", href: `/${username || "user"}/${repo || "repo"}/pullrequests`, active: true },
              { label: "Actions", href: `/${username || "user"}/${repo || "repo"}/actions`, active: false },
              { label: "Settings", href: `/${username || "user"}/${repo || "repo"}/settings`, active: false },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  item.active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
            <Link href={`/${username || "user"}`} className="hover:text-brand-600 hover:underline">
              {username || "user"}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/${username || "user"}/${repo || "repo"}`} className="hover:text-brand-600 hover:underline">
              {repo || "repo"}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-semibold text-foreground">Pull Requests</span>
          </nav>

          {/* Tabs */}
          <nav className="flex items-center gap-1 border-b border-border overflow-x-auto">
            {[
              { label: "Code", active: false },
              { label: "Issues", active: false },
              { label: "Pull Requests", active: true },
              { label: "Actions", active: false },
            ].map((tab) => (
              <span
                key={tab.label}
                className={`flex items-center gap-1.5 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  tab.active
                    ? "border-brand-600 text-foreground"
                    : "border-transparent text-muted-foreground"
                }`}
              >
                {tab.label}
              </span>
            ))}
          </nav>

          {/* PR filters */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-1 rounded-md border border-border p-1">
              <button
                onClick={() => setFilter("open")}
                className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                  filter === "open"
                    ? "bg-brand-600 text-white"
                    : "text-muted-foreground hover:bg-surface-100 dark:hover:bg-dark-200"
                }`}
              >
                <GitPullRequest className="h-4 w-4" />
                Open
                <span className="rounded-full bg-surface-200 px-1.5 py-0.5 text-xs dark:bg-dark-300">
                  {openCount}
                </span>
              </button>
              <button
                onClick={() => setFilter("closed")}
                className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                  filter === "closed"
                    ? "bg-brand-600 text-white"
                    : "text-muted-foreground hover:bg-surface-100 dark:hover:bg-dark-200"
                }`}
              >
                <XCircle className="h-4 w-4" />
                Closed
                <span className="rounded-full bg-surface-200 px-1.5 py-0.5 text-xs dark:bg-dark-300">
                  {closedCount}
                </span>
              </button>
              <button
                onClick={() => setFilter("merged")}
                className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                  filter === "merged"
                    ? "bg-brand-600 text-white"
                    : "text-muted-foreground hover:bg-surface-100 dark:hover:bg-dark-200"
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                Merged
                <span className="rounded-full bg-surface-200 px-1.5 py-0.5 text-xs dark:bg-dark-300">
                  {mergedCount}
                </span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search pull requests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 rounded-md border border-border bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 w-64"
                />
              </div>
              <Link
                href={`/${username || "user"}/${repo || "repo"}/pullrequests/new`}
                className="inline-flex items-center gap-1.5 rounded-md bg-brand-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-700"
              >
                <Plus className="h-4 w-4" />
                New Pull Request
              </Link>
            </div>
          </div>

          {/* PR list */}
          <div className="mt-4 overflow-hidden rounded-lg border border-border">
            {filteredPRs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <GitPullRequest className="h-12 w-12 text-muted-foreground mb-3" />
                <p className="text-sm font-medium text-muted-foreground">
                  No {filter} pull requests found.
                </p>
                <Link
                  href={`/${username || "user"}/${repo || "repo"}/pullrequests/new`}
                  className="mt-2 text-sm text-brand-600 hover:underline"
                >
                  Create a new pull request
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredPRs.map((pr) => (
                  <div
                    key={pr.number}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-surface-50 dark:hover:bg-dark-100 transition-colors"
                  >
                    <PRStateIcon state={pr.state} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start gap-2">
                        <Link
                          href={`/${username || "user"}/${repo || "repo"}/pullrequests/${pr.number}`}
                          className="text-sm font-semibold text-foreground hover:text-brand-600 hover:underline"
                        >
                          {pr.title}
                        </Link>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          #{pr.number}
                        </span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <PRStateBadge state={pr.state} />
                        <span className="inline-flex items-center gap-1">
                          <GitBranch className="h-3 w-3" />
                          {pr.branch}
                        </span>
                        <span>→</span>
                        <span>{pr.base}</span>
                        <span>·</span>
                        <span>
                          {pr.author} opened {pr.date}
                        </span>
                        {pr.comments > 0 && (
                          <span className="inline-flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            {pr.comments}
                          </span>
                        )}
                        <span className="text-green-600">+{pr.additions}</span>
                        <span className="text-red-600">-{pr.deletions}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
