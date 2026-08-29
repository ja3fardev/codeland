"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  GitPullRequest,
  CheckCircle2,
  XCircle,
  MessageSquare,
  GitBranch,
  GitCommit,
  Plus,
  Minus,
  ChevronDown,
  Paperclip,
  Bold,
  Italic,
  Code,
  Link2,
  ListOrdered,
  Quote,
} from "lucide-react";

const mockPR = {
  number: 28,
  title: "feat: implement user authentication with JWT",
  author: "jane_smith",
  authorAvatar: "JS",
  branch: "feature/auth",
  base: "main",
  state: "open" as const,
  createdAt: "2026-08-27T10:00:00Z",
  updatedAt: "2026-08-28T15:30:00Z",
  description:
    "This PR implements JWT-based authentication for the API. It includes:\n\n- Login endpoint\n- Token refresh mechanism\n- Protected route middleware\n- User session management",
  commits: 12,
  additions: 342,
  deletions: 45,
  changedFiles: 8,
};

const mockCommits = [
  { hash: "a1b2c3d", message: "feat: add JWT token generation", author: "jane_smith", date: "2 days ago" },
  { hash: "e4f5g6h", message: "feat: add login endpoint", author: "jane_smith", date: "2 days ago" },
  { hash: "i7j8k9l", message: "feat: add token refresh mechanism", author: "jane_smith", date: "1 day ago" },
  { hash: "m0n1o2p", message: "feat: add protected route middleware", author: "jane_smith", date: "1 day ago" },
  { hash: "q3r4s5t", message: "test: add auth unit tests", author: "jane_smith", date: "12 hours ago" },
];

const mockComments = [
  {
    id: 1,
    author: "mike_chen",
    avatar: "MC",
    date: "1 day ago",
    body: "Looks good overall! Just a few comments on the token expiration logic.",
  },
  {
    id: 2,
    author: "jane_smith",
    avatar: "JS",
    date: "1 day ago",
    body: "Thanks for the review! I've addressed your comments.",
  },
  {
    id: 3,
    author: "sarah_dev",
    avatar: "SD",
    date: "6 hours ago",
    body: "Nice work! Approved from my end.",
  },
];

const mockDiff = [
  { type: "header", content: "@@ -0,0 +1,25 @@" },
  { type: "add", line: 1, content: "import jwt from 'jsonwebtoken';" },
  { type: "add", line: 2, content: "import { Request, Response, NextFunction } from 'express';" },
  { type: "add", line: 3, content: "" },
  { type: "add", line: 4, content: "interface TokenPayload {" },
  { type: "add", line: 5, content: "  userId: string;" },
  { type: "add", line: 6, content: "  email: string;" },
  { type: "add", line: 7, content: "}" },
  { type: "add", line: 8, content: "" },
  { type: "add", line: 9, content: "export function generateToken(payload: TokenPayload): string {" },
  { type: "add", line: 10, content: "  return jwt.sign(payload, process.env.JWT_SECRET!, {" },
  { type: "add", line: 11, content: "    expiresIn: '24h'," },
  { type: "add", line: 12, content: "  });" },
  { type: "add", line: 13, content: "}" },
  { type: "add", line: 14, content: "" },
  { type: "add", line: 15, content: "export function verifyToken(token: string): TokenPayload {" },
  { type: "add", line: 16, content: "  return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;" },
  { type: "add", line: 17, content: "}" },
  { type: "add", line: 18, content: "" },
  { type: "add", line: 19, content: "export function authMiddleware(req: Request, res: Response, next: NextFunction) {" },
  { type: "add", line: 20, content: "  const authHeader = req.headers.authorization;" },
  { type: "add", line: 21, content: "  if (!authHeader?.startsWith('Bearer ')) {" },
  { type: "add", line: 22, content: "    return res.status(401).json({ error: 'No token provided' });" },
  { type: "add", line: 23, content: "  }" },
  { type: "add", line: 24, content: "  const token = authHeader.split(' ')[1];" },
  { type: "add", line: 25, content: "  const decoded = verifyToken(token);" },
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

function PRStateBadge({ state }: { state: "open" | "closed" | "merged" }) {
  const styles = {
    open: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    closed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    merged: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${styles[state]}`}>
      {state === "open" && <GitPullRequest className="mr-1 h-3 w-3" />}
      {state === "merged" && <CheckCircle2 className="mr-1 h-3 w-3" />}
      {state === "closed" && <XCircle className="mr-1 h-3 w-3" />}
      {state.charAt(0).toUpperCase() + state.slice(1)}
    </span>
  );
}

export default function PullRequestDetailPage({
  params,
}: {
  params: Promise<{ username: string; repo: string; number: string }>;
}) {
  const [username, setUsername] = useState("");
  const [repo, setRepo] = useState("");
  const [prNumber, setPrNumber] = useState("");
  const [activeTab, setActiveTab] = useState<"conversation" | "commits" | "checks" | "files">("conversation");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  params.then((p) => { setUsername(p.username); setRepo(p.repo); setPrNumber(p.number); });

  const handleSubmitComment = () => {
    if (!comment.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setComment("");
    }, 500);
  };

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
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
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
            <Link href={`/${username || "user"}/${repo || "repo"}/pullrequests`} className="hover:text-brand-600 hover:underline">
              Pull Requests
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-semibold text-foreground">#{prNumber || "28"}</span>
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

          {/* PR header */}
          <div className="mt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold">{mockPR.title}</h1>
                  <PRStateBadge state={mockPR.state} />
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-mono text-brand-600">#{mockPR.number}</span>
                  <span>·</span>
                  <span>
                    <strong className="text-foreground">{mockPR.author}</strong> wants to merge into{" "}
                    <code className="rounded bg-surface-100 px-1 py-0.5 text-xs dark:bg-dark-200">
                      {mockPR.base}
                    </code>{" "}
                    from{" "}
                    <code className="rounded bg-surface-100 px-1 py-0.5 text-xs dark:bg-dark-200">
                      {mockPR.branch}
                    </code>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* PR sub-tabs */}
          <div className="mt-4 flex items-center gap-1 border-b border-border">
            {[
              { id: "conversation" as const, label: "Conversation", icon: MessageSquare, count: mockComments.length },
              { id: "commits" as const, label: "Commits", icon: GitCommit, count: mockCommits.length },
              { id: "checks" as const, label: "Checks", icon: CheckCircle2, count: 3 },
              { id: "files" as const, label: "Files changed", icon: GitPullRequest, count: mockPR.changedFiles },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "border-brand-600 text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
                <span className="rounded-full bg-surface-200 px-1.5 py-0.5 text-xs dark:bg-dark-300">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Conversation tab */}
          {activeTab === "conversation" && (
            <div className="mt-6">
              {/* PR description */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-surface-200 dark:bg-dark-300 flex items-center justify-center text-sm font-bold">
                    {mockPR.authorAvatar}
                  </div>
                  <div className="mt-1 h-full w-0.5 bg-border" />
                </div>
                <div className="flex-1 rounded-lg border border-border">
                  <div className="flex items-center justify-between border-b border-border px-4 py-2">
                    <div className="flex items-center gap-2">
                      <strong className="text-sm">{mockPR.author}</strong>
                      <span className="text-xs text-muted-foreground">commented 2 days ago</span>
                    </div>
                    <span className="rounded-full bg-brand-600 px-2 py-0.5 text-xs font-medium text-white">
                      Author
                    </span>
                  </div>
                  <div className="p-4">
                    <pre className="whitespace-pre-wrap font-sans text-sm text-foreground">
                      {mockPR.description}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Comments */}
              <div className="mt-6 space-y-6">
                {mockComments.map((c) => (
                  <div key={c.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 rounded-full bg-surface-200 dark:bg-dark-300 flex items-center justify-center text-sm font-bold">
                        {c.avatar}
                      </div>
                    </div>
                    <div className="flex-1 rounded-lg border border-border">
                      <div className="flex items-center justify-between border-b border-border px-4 py-2">
                        <div className="flex items-center gap-2">
                          <strong className="text-sm">{c.author}</strong>
                          <span className="text-xs text-muted-foreground">{c.date}</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-foreground">{c.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment box */}
              <div className="mt-6 rounded-lg border border-border">
                <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                  <button className="rounded p-1 hover:bg-surface-100 dark:hover:bg-dark-200">
                    <Bold className="h-4 w-4" />
                  </button>
                  <button className="rounded p-1 hover:bg-surface-100 dark:hover:bg-dark-200">
                    <Italic className="h-4 w-4" />
                  </button>
                  <button className="rounded p-1 hover:bg-surface-100 dark:hover:bg-dark-200">
                    <Code className="h-4 w-4" />
                  </button>
                  <button className="rounded p-1 hover:bg-surface-100 dark:hover:bg-dark-200">
                    <Link2 className="h-4 w-4" />
                  </button>
                  <button className="rounded p-1 hover:bg-surface-100 dark:hover:bg-dark-200">
                    <ListOrdered className="h-4 w-4" />
                  </button>
                  <button className="rounded p-1 hover:bg-surface-100 dark:hover:bg-dark-200">
                    <Quote className="h-4 w-4" />
                  </button>
                  <button className="rounded p-1 hover:bg-surface-100 dark:hover:bg-dark-200">
                    <Paperclip className="h-4 w-4" />
                  </button>
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Leave a comment..."
                  rows={4}
                  className="w-full resize-y border-0 bg-transparent px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none"
                />
                <div className="flex items-center justify-end border-t border-border px-4 py-2">
                  <button
                    onClick={handleSubmitComment}
                    disabled={!comment.trim() || submitting}
                    className="inline-flex items-center gap-1.5 rounded-md bg-brand-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      "Comment"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Commits tab */}
          {activeTab === "commits" && (
            <div className="mt-6 overflow-hidden rounded-lg border border-border">
              <div className="divide-y divide-border">
                {mockCommits.map((commit) => (
                  <div
                    key={commit.hash}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-surface-50 dark:hover:bg-dark-100 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-surface-200 dark:bg-dark-300 flex items-center justify-center">
                      <GitCommit className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">{commit.message}</p>
                      <p className="text-xs text-muted-foreground">
                        <span className="font-mono text-brand-600">{commit.hash}</span>
                        {" · "}
                        {commit.author} · {commit.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Checks tab */}
          {activeTab === "checks" && (
            <div className="mt-6 overflow-hidden rounded-lg border border-border">
              <div className="divide-y divide-border">
                {[
                  { name: "ci/build", status: "success", duration: "2m 15s" },
                  { name: "ci/test", status: "success", duration: "4m 32s" },
                  { name: "ci/lint", status: "success", duration: "45s" },
                ].map((check) => (
                  <div
                    key={check.name}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-surface-50 dark:hover:bg-dark-100 transition-colors"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{check.name}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{check.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Files changed tab */}
          {activeTab === "files" && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border px-4 py-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">{mockPR.changedFiles} files changed</span>
                  <span className="text-green-600">+{mockPR.additions}</span>
                  <span className="text-red-600">-{mockPR.deletions}</span>
                </div>
                <button className="rounded-md border border-border px-3 py-1 text-xs font-medium hover:bg-surface-50 dark:hover:bg-dark-100">
                  View file
                </button>
              </div>

              <div className="overflow-hidden rounded-lg border border-border">
                <div className="flex items-center gap-2 border-b border-border bg-surface-50 px-4 py-2 dark:bg-dark-100">
                  <span className="text-sm font-mono font-medium">src/lib/auth.ts</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse font-mono text-xs">
                    <tbody>
                      {mockDiff.map((line, i) => {
                        if (line.type === "header") {
                          return (
                            <tr key={i} className="bg-surface-100 dark:bg-dark-200">
                              <td colSpan={3} className="px-4 py-1 text-xs text-muted-foreground">
                                {line.content}
                              </td>
                            </tr>
                          );
                        }
                        const bgColor = line.type === "add"
                          ? "bg-green-50 dark:bg-green-950"
                          : line.type === "remove"
                          ? "bg-red-50 dark:bg-red-950"
                          : "";
                        return (
                          <tr key={i} className={bgColor}>
                            <td className="w-8 select-none border-r border-border px-2 py-0.5 text-right text-muted-foreground">
                              {line.type === "add" ? "+" : ""}
                            </td>
                            <td className="w-12 select-none border-r border-border px-2 py-0.5 text-right text-muted-foreground">
                              {line.line}
                            </td>
                            <td className="whitespace-pre px-4 py-0.5 text-foreground">
                              {line.content}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
