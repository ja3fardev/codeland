"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Plus,
  Search,
  CircleDot,
  CheckCircle2,
  MessageSquare,
  Tag,
  Milestone,
  Filter,
} from "lucide-react";

const labels = [
  { name: "bug", color: "bg-red-500" },
  { name: "enhancement", color: "bg-purple-500" },
  { name: "documentation", color: "bg-blue-500" },
  { name: "good first issue", color: "bg-green-500" },
  { name: "help wanted", color: "bg-yellow-500" },
  { name: "question", color: "bg-orange-500" },
  { name: "wontfix", color: "bg-gray-500" },
];

const mockIssues = [
  {
    number: 42,
    title: "Authentication fails when using SSO with Azure AD",
    author: "jane_smith",
    labels: ["bug", "help wanted"],
    date: "2 hours ago",
    comments: 5,
    state: "open" as const,
  },
  {
    number: 41,
    title: "Add dark mode support for the dashboard",
    author: "mike_chen",
    labels: ["enhancement"],
    date: "5 hours ago",
    comments: 12,
    state: "open" as const,
  },
  {
    number: 40,
    title: "Update API documentation for v2 endpoints",
    author: "sarah_dev",
    labels: ["documentation"],
    date: "1 day ago",
    comments: 3,
    state: "open" as const,
  },
  {
    number: 39,
    title: "Performance degradation in search results page",
    author: "alex_ops",
    labels: ["bug"],
    date: "2 days ago",
    comments: 8,
    state: "open" as const,
  },
  {
    number: 38,
    title: "Implement rate limiting for API endpoints",
    author: "john_doe",
    labels: ["enhancement", "good first issue"],
    date: "3 days ago",
    comments: 15,
    state: "closed" as const,
  },
  {
    number: 37,
    title: "Fix memory leak in WebSocket connections",
    author: "jane_smith",
    labels: ["bug"],
    date: "4 days ago",
    comments: 6,
    state: "closed" as const,
  },
  {
    number: 36,
    title: "Add TypeScript strict mode configuration",
    author: "mike_chen",
    labels: ["enhancement"],
    date: "5 days ago",
    comments: 4,
    state: "closed" as const,
  },
  {
    number: 35,
    title: "Database migration script fails on PostgreSQL 15",
    author: "sarah_dev",
    labels: ["bug", "wontfix"],
    date: "1 week ago",
    comments: 2,
    state: "closed" as const,
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

function LabelBadge({ label }: { label: string }) {
  const labelData = labels.find((l) => l.name === label);
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-white ${labelData?.color || "bg-gray-500"}`}
    >
      {label}
    </span>
  );
}

export default function IssuesPage({
  params,
}: {
  params: Promise<{ username: string; repo: string }>;
}) {
  const [username, setUsername] = useState("");
  const [repo, setRepo] = useState("");
  const [filter, setFilter] = useState<"open" | "closed">("open");
  const [searchQuery, setSearchQuery] = useState("");

  params.then((p) => { setUsername(p.username); setRepo(p.repo); });

  const filteredIssues = mockIssues.filter((issue) => {
    if (issue.state !== filter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        issue.title.toLowerCase().includes(q) ||
        issue.author.toLowerCase().includes(q) ||
        issue.labels.some((l) => l.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const openCount = mockIssues.filter((i) => i.state === "open").length;
  const closedCount = mockIssues.filter((i) => i.state === "closed").length;

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
              { label: "Issues", href: `/${username || "user"}/${repo || "repo"}/issues`, active: true },
              { label: "Pull Requests", href: `/${username || "user"}/${repo || "repo"}/pullrequests`, active: false },
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
            <span className="font-semibold text-foreground">Issues</span>
          </nav>

          {/* Tabs */}
          <nav className="flex items-center gap-1 border-b border-border overflow-x-auto">
            {[
              { label: "Code", active: false },
              { label: "Issues", active: true },
              { label: "Pull Requests", active: false },
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

          {/* Issues sub-tabs */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 rounded-md border border-border p-1">
                <button
                  onClick={() => setFilter("open")}
                  className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                    filter === "open"
                      ? "bg-brand-600 text-white"
                      : "text-muted-foreground hover:bg-surface-100 dark:hover:bg-dark-200"
                  }`}
                >
                  <CircleDot className="h-4 w-4" />
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
                  <CheckCircle2 className="h-4 w-4" />
                  Closed
                  <span className="rounded-full bg-surface-200 px-1.5 py-0.5 text-xs dark:bg-dark-300">
                    {closedCount}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search issues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 rounded-md border border-border bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 w-64"
                />
              </div>
              <Link
                href={`/${username || "user"}/${repo || "repo"}/issues/new`}
                className="inline-flex items-center gap-1.5 rounded-md bg-brand-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-700"
              >
                <Plus className="h-4 w-4" />
                New Issue
              </Link>
            </div>
          </div>

          {/* Labels and Milestones tabs */}
          <div className="mt-4 flex items-center gap-1 border-b border-border">
            <button className="flex items-center gap-1.5 border-b-2 border-brand-600 px-4 py-2 text-sm font-medium text-foreground">
              <Tag className="h-4 w-4" />
              Labels
              <span className="rounded-full bg-surface-200 px-1.5 py-0.5 text-xs dark:bg-dark-300">
                {labels.length}
              </span>
            </button>
            <button className="flex items-center gap-1.5 border-b-2 border-transparent px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              <Milestone className="h-4 w-4" />
              Milestones
            </button>
          </div>

          {/* Issue list */}
          <div className="mt-4 overflow-hidden rounded-lg border border-border">
            {filteredIssues.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CircleDot className="h-12 w-12 text-muted-foreground mb-3" />
                <p className="text-sm font-medium text-muted-foreground">
                  No {filter} issues found.
                </p>
                <Link
                  href={`/${username || "user"}/${repo || "repo"}/issues/new`}
                  className="mt-2 text-sm text-brand-600 hover:underline"
                >
                  Create a new issue
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredIssues.map((issue) => (
                  <div
                    key={issue.number}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-surface-50 dark:hover:bg-dark-100 transition-colors"
                  >
                    {issue.state === "open" ? (
                      <CircleDot className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                    ) : (
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-purple-600" />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start gap-2">
                        <Link
                          href={`/${username || "user"}/${repo || "repo"}/issues/${issue.number}`}
                          className="text-sm font-semibold text-foreground hover:text-brand-600 hover:underline"
                        >
                          {issue.title}
                        </Link>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          #{issue.number}
                        </span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        {issue.labels.map((label) => (
                          <LabelBadge key={label} label={label} />
                        ))}
                        <span className="text-xs text-muted-foreground">
                          {issue.author} opened {issue.date}
                        </span>
                        {issue.comments > 0 && (
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <MessageSquare className="h-3 w-3" />
                            {issue.comments}
                          </span>
                        )}
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
