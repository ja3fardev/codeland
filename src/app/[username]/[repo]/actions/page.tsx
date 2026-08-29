import Link from "next/link";
import {
  ChevronRight,
  CheckCircle,
  XCircle,
  Clock,
  RotateCw,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const workflowRuns = [
  {
    id: 1,
    name: "CI Pipeline",
    branch: "main",
    commitMessage: "feat: add user authentication module",
    commitHash: "a3f7b2c",
    status: "success" as const,
    duration: "4m 32s",
    date: "2 hours ago",
    triggeredBy: "sarahchen",
  },
  {
    id: 2,
    name: "Deploy to Production",
    branch: "main",
    commitMessage: "chore: bump version to 1.2.0",
    commitHash: "b8c2a1d",
    status: "success" as const,
    duration: "2m 15s",
    date: "2 hours ago",
    triggeredBy: "sarahchen",
  },
  {
    id: 3,
    name: "CI Pipeline",
    branch: "feature/auth",
    commitMessage: "feat: implement OAuth2 flow",
    commitHash: "c9d3e4f",
    status: "failure" as const,
    duration: "3m 48s",
    date: "5 hours ago",
    triggeredBy: "mikej",
  },
  {
    id: 4,
    name: "Security Scan",
    branch: "main",
    commitMessage: "fix: patch XSS vulnerability",
    commitHash: "d4e5f6a",
    status: "success" as const,
    duration: "6m 12s",
    date: "1 day ago",
    triggeredBy: "alexr",
  },
  {
    id: 5,
    name: "CI Pipeline",
    branch: "develop",
    commitMessage: "refactor: optimize database queries",
    commitHash: "e7f8g9h",
    status: "pending" as const,
    duration: "-",
    date: "1 day ago",
    triggeredBy: "emilyz",
  },
  {
    id: 6,
    name: "Nightly Build",
    branch: "main",
    commitMessage: "chore: update dependencies",
    commitHash: "f1g2h3i",
    status: "success" as const,
    duration: "8m 45s",
    date: "2 days ago",
    triggeredBy: "github-actions[bot]",
  },
  {
    id: 7,
    name: "CI Pipeline",
    branch: "fix/api-error",
    commitMessage: "fix: handle null response from API",
    commitHash: "g4h5i6j",
    status: "failure" as const,
    duration: "1m 23s",
    date: "3 days ago",
    triggeredBy: "jordanl",
  },
];

function StatusIcon({ status }: { status: typeof workflowRuns[0]["status"] }) {
  switch (status) {
    case "success":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "failure":
      return <XCircle className="h-5 w-5 text-red-500" />;
    case "pending":
      return <Clock className="h-5 w-5 text-yellow-500" />;
    default:
      return null;
  }
}

function StatusBadge({ status }: { status: typeof workflowRuns[0]["status"] }) {
  switch (status) {
    case "success":
      return <Badge variant="success">Success</Badge>;
    case "failure":
      return <Badge variant="danger">Failed</Badge>;
    case "pending":
      return <Badge variant="warning">Pending</Badge>;
    default:
      return null;
  }
}

function RepoTabs({ username, repo }: { username: string; repo: string }) {
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
            tab.id === "actions"
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

export default async function ActionsPage({
  params,
}: {
  params: Promise<{ username: string; repo: string }>;
}) {
  const { username, repo } = await params;

  return (
    <div className="flex min-h-0 flex-1">
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
            <Link href={`/${username}`} className="hover:text-brand-600 hover:underline">
              {username}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/${username}/${repo}`} className="hover:text-brand-600 hover:underline">
              {repo}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-semibold text-foreground">Actions</span>
          </nav>

          {/* Repo tabs */}
          <RepoTabs username={username} repo={repo} />

          <div className="mt-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Workflow Runs</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <RotateCw className="mr-2 h-4 w-4" />
                  Rerun failed
                </Button>
                <Button variant="outline" size="sm">
                  <ChevronDown className="mr-2 h-4 w-4" />
                  All workflows
                </Button>
              </div>
            </div>

            <div className="divide-y divide-border rounded-lg border">
              {workflowRuns.map((run) => (
                <div
                  key={run.id}
                  className="flex items-center gap-4 p-4 hover:bg-surface-50 dark:hover:bg-dark-100 transition-colors"
                >
                  <StatusIcon status={run.status} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{run.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {run.branch}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground truncate">
                      {run.commitMessage}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-mono text-brand-600 dark:text-brand-400">
                        {run.commitHash}
                      </span>
                      <span>·</span>
                      <span>by {run.triggeredBy}</span>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground">
                    <StatusBadge status={run.status} />
                    <span className="w-20 text-right">{run.duration}</span>
                    <span className="w-24 text-right">{run.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
