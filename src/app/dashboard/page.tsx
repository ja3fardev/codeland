"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Star,
  GitFork,
  GitPullRequest,
  GitCommit,
  GitBranch,
  Code,
  Rocket,
  MessageSquare,
  Tag,
  Eye,
  ChevronRight,
  Shield,
  Zap,
  TrendingUp,
  Clock,
} from "lucide-react";

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Go: "#00ADD8",
  Rust: "#dea584",
};

const recentRepos = [
  { name: "codeland/frontend", lang: "TypeScript", updated: "2 hours ago" },
  { name: "codeland/api-gateway", lang: "Go", updated: "5 hours ago" },
  { name: "codeland/auth-service", lang: "Rust", updated: "1 day ago" },
  { name: "user/next-dashboard", lang: "TypeScript", updated: "3 days ago" },
  { name: "user/ml-pipeline", lang: "Python", updated: "4 days ago" },
  { name: "user/codeland-cli", lang: "TypeScript", updated: "1 week ago" },
  { name: "codeland/docs", lang: "TypeScript", updated: "2 weeks ago" },
];

const activities = [
  {
    user: "Sarah Chen",
    action: "starred",
    repo: "vercel/next.js",
    time: "2 hours ago",
    iconColor: "text-yellow-400",
    Icon: Star,
  },
  {
    user: "Alex Rivera",
    action: "pushed 3 commits to",
    repo: "codeland/frontend",
    branch: "main",
    time: "4 hours ago",
    iconColor: "text-green-400",
    Icon: GitCommit,
  },
  {
    user: "Maya Patel",
    action: "opened a pull request in",
    repo: "codeland/api-gateway",
    prNum: "#42",
    prTitle: "Fix authentication middleware bug",
    time: "5 hours ago",
    iconColor: "text-purple-400",
    Icon: GitPullRequest,
  },
  {
    user: "James Liu",
    action: "released v2.1.0 of",
    repo: "codeland/auth-service",
    time: "8 hours ago",
    iconColor: "text-blue-400",
    Icon: Tag,
  },
  {
    user: "Emma Wilson",
    action: "started sponsoring",
    repo: "codeland/frontend",
    time: "12 hours ago",
    iconColor: "text-pink-400",
    Icon: Star,
  },
  {
    user: "Liam O'Brien",
    action: "forked",
    repo: "facebook/react",
    time: "1 day ago",
    iconColor: "text-dark-500",
    Icon: GitFork,
  },
  {
    user: "Sofia Rodriguez",
    action: "created issue #128 in",
    repo: "codeland/frontend",
    issueTitle: "Add dark mode support",
    time: "1 day ago",
    iconColor: "text-green-400",
    Icon: MessageSquare,
  },
  {
    user: "Daniel Kim",
    action: "commented on PR #45 in",
    repo: "codeland/api-gateway",
    time: "2 days ago",
    iconColor: "text-dark-500",
    Icon: MessageSquare,
  },
];

const exploreRepos = [
  { name: "denoland/deno", desc: "A secure runtime for JavaScript and TypeScript", lang: "Rust", stars: "95.2k" },
  { name: "tailwindlabs/tailwindcss", desc: "A utility-first CSS framework for rapid UI", lang: "TypeScript", stars: "82.1k" },
  { name: "prisma/prisma", desc: "Next-generation ORM for Node.js and TypeScript", lang: "TypeScript", stars: "40.8k" },
];

export default function DashboardPage() {
  const { data: session } = useSession();
  const name = session?.user?.name || "User";
  const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&size=40`;

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      {/* Main Feed */}
      <div className="min-w-0 flex-1">
        {/* Tabs */}
        <div className="mb-4 flex items-center gap-4 border-b border-dark-200 pb-3">
          <button className="border-b-2 border-violet-500 pb-3 -mb-[13px] text-sm font-semibold text-dark-900">
            For you
          </button>
          <button className="pb-3 -mb-[13px] text-sm text-dark-500 hover:text-dark-700">
            Following
          </button>
        </div>

        {/* Activity Feed */}
        <div className="space-y-0">
          {activities.map((act, i) => {
            const ActIcon = act.Icon;
            return (
              <div
                key={i}
                className="flex gap-3 border-b border-dark-200 py-4 first:pt-0 hover:bg-dark-50/50 -mx-2 px-2 rounded"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(act.user)}&background=6366f1&color=fff&size=32`}
                  alt=""
                  className="h-8 w-8 shrink-0 rounded-full"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-dark-700">
                    <span className="font-semibold text-dark-900">{act.user}</span>{" "}
                    {act.action}{" "}
                    <Link
                      href={`/${act.repo}`}
                      className="font-semibold text-violet-400 hover:underline"
                    >
                      {act.repo}
                    </Link>
                    {act.prNum && (
                      <>
                        {" "}
                        <span className="font-semibold text-violet-400">
                          {act.prNum}
                        </span>
                        : {act.prTitle}
                      </>
                    )}
                    {act.issueTitle && (
                      <>
                        {" "}
                        <span className="text-dark-600">: {act.issueTitle}</span>
                      </>
                    )}
                    {act.branch && (
                      <>
                        {" "}
                        in{" "}
                        <span className="inline-flex items-center gap-0.5 rounded-md bg-dark-100 px-1.5 py-0.5 text-xs font-mono text-dark-700">
                          <GitBranch className="h-3 w-3" />
                          {act.branch}
                        </span>
                      </>
                    )}
                  </p>
                  <p className="mt-0.5 text-xs text-dark-500">
                    <ActIcon className={`mr-1 inline h-3 w-3 ${act.iconColor}`} />
                    {act.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <button className="mt-4 w-full rounded-md border border-dark-200 py-2 text-sm font-medium text-dark-600 hover:bg-dark-100 hover:text-dark-900">
          Show more activity
        </button>
      </div>

      {/* Left Sidebar */}
      <div className="hidden w-[280px] shrink-0 space-y-6 lg:block">
        {/* User info */}
        <div className="flex items-center gap-3">
          <img src={avatar} alt="" className="h-10 w-10 rounded-full" />
          <div>
            <p className="text-sm font-semibold text-dark-900">{name}</p>
            <p className="text-xs text-dark-500">
              {(session?.user as any)?.username || "user"}
            </p>
          </div>
        </div>

        {/* Recent repos */}
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-dark-500">
            Recent
          </h3>
          <div className="space-y-1">
            {recentRepos.map((repo) => (
              <Link
                key={repo.name}
                href={`/${repo.name}`}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-dark-700 hover:bg-dark-100 hover:text-dark-900"
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor: LANG_COLORS[repo.lang] || "#8b949e",
                  }}
                />
                <span className="truncate">{repo.name}</span>
                <span className="ml-auto shrink-0 text-xs text-dark-500">
                  {repo.updated}
                </span>
              </Link>
            ))}
          </div>
          <Link
            href="/explore"
            className="mt-2 flex items-center gap-1 text-xs text-violet-400 hover:underline"
          >
            Show more <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Starred */}
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-dark-500">
            Starred
          </h3>
          <div className="space-y-1">
            {["vercel/next.js", "facebook/react", "microsoft/typescript"].map(
              (repo) => (
                <Link
                  key={repo}
                  href={`/${repo}`}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-dark-700 hover:bg-dark-100 hover:text-dark-900"
                >
                  <Star className="h-3.5 w-3.5 text-yellow-400" />
                  <span className="truncate">{repo}</span>
                </Link>
              )
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden w-[300px] shrink-0 space-y-6 xl:block">
        {/* Explore repos */}
        <div className="rounded-lg border border-dark-200 bg-dark-50 p-4">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark-900">
            <TrendingUp className="h-4 w-4 text-violet-400" />
            Explore repositories
          </h3>
          <div className="space-y-3">
            {exploreRepos.map((repo) => (
              <div key={repo.name}>
                <Link
                  href={`/${repo.name}`}
                  className="text-sm font-semibold text-violet-400 hover:underline"
                >
                  {repo.name}
                </Link>
                <p className="mt-0.5 text-xs text-dark-500 line-clamp-2">
                  {repo.desc}
                </p>
                <div className="mt-1 flex items-center gap-2 text-xs text-dark-500">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: LANG_COLORS[repo.lang] || "#8b949e",
                    }}
                  />
                  {repo.lang}
                  <Star className="h-3 w-3" /> {repo.stars}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest changes */}
        <div className="rounded-lg border border-dark-200 bg-dark-50 p-4">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark-900">
            <Rocket className="h-4 w-4 text-blue-400" />
            Latest changes
          </h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-dark-700">
                <span className="font-semibold">codeland/frontend</span>{" "}
                <span className="text-green-400">v3.2.1</span>
              </p>
              <p className="mt-0.5 text-xs text-dark-500">
                Performance improvements and bug fixes
              </p>
              <p className="mt-0.5 text-xs text-dark-500">2 hours ago</p>
            </div>
            <div>
              <p className="text-dark-700">
                <span className="font-semibold">codeland/api-gateway</span>{" "}
                <span className="text-green-400">v1.8.0</span>
              </p>
              <p className="mt-0.5 text-xs text-dark-500">
                New rate limiting middleware
              </p>
              <p className="mt-0.5 text-xs text-dark-500">1 day ago</p>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="rounded-lg border border-dark-200 bg-dark-50 p-4">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark-900">
            <Zap className="h-4 w-4 text-yellow-400" />
            Build software
          </h3>
          <div className="space-y-2">
            <Link
              href="/repos/new"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-dark-700 hover:bg-dark-100"
            >
              <Code className="h-4 w-4" />
              New repository
            </Link>
            <Link
              href="/explore"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-dark-700 hover:bg-dark-100"
            >
              <Eye className="h-4 w-4" />
              Explore open-source
            </Link>
          </div>
        </div>

        {/* Pro card */}
        <div className="rounded-lg border border-violet-500/30 bg-gradient-to-br from-violet-600/10 to-dark-50 p-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-violet-400" />
            <h3 className="text-sm font-semibold text-dark-900">
              CodeLand Pro
            </h3>
          </div>
          <p className="mt-2 text-xs text-dark-500">
            Advanced code review, AI-powered suggestions, and priority support.
          </p>
          <Link
            href="/register"
            className="mt-3 inline-block rounded-md bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-700"
          >
            Start free trial
          </Link>
        </div>
      </div>
    </div>
  );
}
