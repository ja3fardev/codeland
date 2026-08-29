"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ChevronDown,
  Copy,
  Check,
  File,
  Folder,
  FileText,
  Code,
  GitCommit,
  History,
  ExternalLink,
  Download,
} from "lucide-react";

const branches = ["main", "develop", "feature/auth", "fix/types"];

const fileTree = [
  { name: "src", type: "folder" as const, path: "src" },
  { name: ".github", type: "folder" as const, path: ".github" },
  { name: "package.json", type: "file" as const, path: "package.json" },
  { name: "tsconfig.json", type: "file" as const, path: "tsconfig.json" },
  { name: "README.md", type: "file" as const, path: "README.md" },
  { name: ".gitignore", type: "file" as const, path: ".gitignore" },
  { name: "next.config.js", type: "file" as const, path: "next.config.js" },
  { name: "tailwind.config.ts", type: "file" as const, path: "tailwind.config.ts" },
];

const mockCode = `"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
          "disabled:pointer-events-none disabled:opacity-50",
          variant === "default" && "bg-brand-600 text-white hover:bg-brand-700 shadow-sm",
          variant === "destructive" && "bg-red-600 text-white hover:bg-red-700",
          variant === "outline" && "border border-surface-300 bg-white hover:bg-surface-50",
          variant === "secondary" && "bg-surface-100 text-surface-900 hover:bg-surface-200",
          variant === "ghost" && "hover:bg-surface-100 text-surface-700",
          variant === "link" && "text-brand-600 underline-offset-4 hover:underline",
          size === "default" && "h-9 px-4 py-2",
          size === "sm" && "h-8 rounded-md px-3 text-xs",
          size === "lg" && "h-10 rounded-md px-8",
          size === "icon" && "h-9 w-9",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };`;

const codeLines = mockCode.split("\n");

const fileCommits: Record<string, { message: string; date: string; hash: string }> = {
  "src": { message: "feat: add auth module", date: "2 days ago", hash: "a3f7b2c" },
  ".github": { message: "ci: add GitHub Actions workflow", date: "5 days ago", hash: "e91d4f0" },
  "package.json": { message: "chore: update dependencies", date: "1 day ago", hash: "b8c2a1d" },
  "tsconfig.json": { message: "chore: update tsconfig", date: "1 week ago", hash: "f4e3d2c" },
  "README.md": { message: "docs: update README with setup instructions", date: "3 days ago", hash: "c1a2b3d" },
  ".gitignore": { message: "chore: add .gitignore", date: "2 weeks ago", hash: "d4e5f6a" },
  "next.config.js": { message: "chore: update next config", date: "4 days ago", hash: "g7h8i9j" },
  "tailwind.config.ts": { message: "style: add custom theme", date: "1 week ago", hash: "k1l2m3n" },
};

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

function FileIcon({ type }: { type: "file" | "folder" }) {
  if (type === "folder") {
    return <Folder className="h-4 w-4 fill-yellow-500 text-yellow-600" />;
  }
  return <File className="h-4 w-4 text-surface-500" />;
}

function CodeBlock({ code, showLineNumbers }: { code: string; showLineNumbers: boolean }) {
  const [copied, setCopied] = useState(false);
  const lines = code.split("\n");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 z-10 rounded-md border border-border bg-surface-50 p-1.5 text-muted-foreground hover:bg-surface-100 dark:bg-dark-100 dark:hover:bg-dark-200"
        title="Copy raw content"
      >
        {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
      </button>
      <div className="overflow-x-auto rounded-lg border border-border bg-surface-50 dark:bg-dark-100">
        <table className="w-full border-collapse font-mono text-xs">
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className="hover:bg-surface-100 dark:hover:bg-dark-200">
                {showLineNumbers && (
                  <td className="select-none border-r border-border px-3 py-0.5 text-right text-muted-foreground">
                    {i + 1}
                  </td>
                )}
                <td className="whitespace-pre px-4 py-0.5 text-foreground">
                  {line || " "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function CodePage({
  searchParams,
  params,
}: {
  params: Promise<{ username: string; repo: string }>;
  searchParams: Promise<{ file?: string; path?: string }>;
}) {
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [showRaw, setShowRaw] = useState(false);

  return (
    <CodePageClient
      showLineNumbers={showLineNumbers}
      setShowLineNumbers={setShowLineNumbers}
      showRaw={showRaw}
      setShowRaw={setShowRaw}
      params={params}
      searchParams={searchParams}
    />
  );
}

function CodePageClient({
  showLineNumbers,
  setShowLineNumbers,
  showRaw,
  setShowRaw,
  params,
  searchParams,
}: {
  showLineNumbers: boolean;
  setShowLineNumbers: (v: boolean) => void;
  showRaw: boolean;
  setShowRaw: (v: boolean) => void;
  params: Promise<{ username: string; repo: string }>;
  searchParams: Promise<{ file?: string; path?: string }>;
}) {
  const [username, setUsername] = useState("");
  const [repo, setRepo] = useState("");
  const [selectedFile, setSelectedFile] = useState("src/components/Button.tsx");

  params.then((p) => { setUsername(p.username); setRepo(p.repo); });

  const filePathParts = selectedFile.split("/");

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

          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-50 px-3 py-1.5 text-sm font-medium dark:bg-dark-100">
              <Code className="h-4 w-4" />
              main
              <ChevronDown className="h-3 w-3" />
            </button>
          </div>

          <nav className="space-y-1">
            {[
              { label: "Code", href: `/${username || "user"}/${repo || "repo"}`, icon: Code, active: true },
              { label: "Issues", href: `/${username || "user"}/${repo || "repo"}/issues`, icon: FileText },
              { label: "Pull Requests", href: `/${username || "user"}/${repo || "repo"}/pullrequests`, icon: FileText },
              { label: "Actions", href: `/${username || "user"}/${repo || "repo"}/actions`, icon: FileText },
              { label: "Settings", href: `/${username || "user"}/${repo || "repo"}/settings`, icon: FileText },
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
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Files
            </p>
            {fileTree.map((item) => (
              <button
                key={item.path}
                onClick={() => setSelectedFile(item.type === "file" ? item.path : `src/`)}
                className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors text-left"
              >
                <FileIcon type={item.type} />
                {item.name}
              </button>
            ))}
          </div>
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
            <span className="font-semibold text-foreground">Code</span>
          </nav>

          {/* Tabs */}
          <nav className="flex items-center gap-1 border-b border-border overflow-x-auto">
            {[
              { label: "Code", active: true },
              { label: "Issues", active: false },
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

          {/* File path breadcrumbs */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm">
              {filePathParts.map((part, i) => (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
                  <span className="font-mono font-medium text-foreground">{part}</span>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-surface-50 dark:hover:bg-dark-100">
                <GitCommit className="h-3 w-3" />
                Blame
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-surface-50 dark:hover:bg-dark-100">
                <History className="h-3 w-3" />
                History
              </button>
            </div>
          </div>

          {/* Code view controls */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowLineNumbers(!showLineNumbers)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  showLineNumbers
                    ? "bg-brand-600 text-white"
                    : "border border-border text-muted-foreground hover:bg-surface-50 dark:hover:bg-dark-100"
                }`}
              >
                Line Numbers
              </button>
              <button
                onClick={() => setShowRaw(!showRaw)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  showRaw
                    ? "bg-brand-600 text-white"
                    : "border border-border text-muted-foreground hover:bg-surface-50 dark:hover:bg-dark-100"
                }`}
              >
                Raw
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{codeLines.length} lines</span>
              <span>·</span>
              <span>{(new TextEncoder().encode(mockCode).length / 1024).toFixed(1)} KB</span>
            </div>
          </div>

          {/* Code block */}
          <div className="mt-4">
            {showRaw ? (
              <div className="overflow-x-auto rounded-lg border border-border bg-surface-50 p-4 dark:bg-dark-100">
                <pre className="font-mono text-xs text-foreground">
                  {mockCode}
                </pre>
              </div>
            ) : (
              <CodeBlock code={mockCode} showLineNumbers={showLineNumbers} />
            )}
          </div>

          {/* Commit info at bottom */}
          <div className="mt-4 rounded-lg border border-border p-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-surface-200 dark:bg-dark-300" />
              <div>
                <p className="text-sm font-medium">Update Button component with variants</p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-mono text-brand-600">b8c2a1d</span>
                  {" · "}
                  <span>1 day ago</span>
                  {" · "}
                  <span>john_doe</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
