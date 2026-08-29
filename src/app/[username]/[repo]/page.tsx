import Link from "next/link";
import {
  Star,
  GitFork,
  Eye,
  ChevronDown,
  ChevronRight,
  Copy,
  File,
  Folder,
  FileText,
  ExternalLink,
  Code,
} from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";

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

const readmeContent = `# CodeLand

A revolutionary developer platform built for the next generation of software engineers.

## Features

- **Real-time Collaboration** - Code together with your team in real-time
- **AI-Powered Code Review** - Get instant feedback on your pull requests
- **Integrated CI/CD** - Automate your deployment pipeline
- **Security Scanning** - Detect vulnerabilities before they reach production

## Getting Started

\`\`\`bash
# Clone the repository
git clone https://github.com/johndoe/codeland.git

# Install dependencies
cd codeland
npm install

# Start development server
npm run dev
\`\`\`

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) first.

## License

MIT License - see [LICENSE](LICENSE) for details.
`;

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

function CloneBox() {
  return (
    <div className="flex items-center gap-2 rounded-md border border-border bg-surface-50 p-2 dark:bg-dark-100">
      <button className="rounded bg-surface-200 px-3 py-1 text-xs font-medium text-surface-900 dark:bg-dark-300 dark:text-dark-900">
        HTTPS
      </button>
      <button className="rounded px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-surface-200 dark:hover:bg-dark-300">
        SSH
      </button>
      <div className="flex-1 truncate rounded bg-background px-3 py-1 text-xs text-muted-foreground border border-border">
        https://github.com/johndoe/codeland.git
      </div>
      <button className="rounded p-1 hover:bg-surface-200 dark:hover:bg-dark-300" title="Copy URL">
        <Copy className="h-4 w-4" />
      </button>
    </div>
  );
}

function FileIcon({ type }: { type: "file" | "folder" }) {
  if (type === "folder") {
    return <Folder className="h-4 w-4 fill-yellow-500 text-yellow-600" />;
  }
  return <File className="h-4 w-4 text-surface-500" />;
}

export default async function RepoPage({
  params,
}: {
  params: Promise<{ username: string; repo: string }>;
}) {
  const { username, repo } = await params;

  return (
    <div className="flex min-h-0 flex-1">
      <Sidebar
        repoName={repo}
        repoDescription="A revolutionary developer platform for modern software engineering teams."
      />

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
            <Link href={`/${username}`} className="hover:text-brand-600 hover:underline">
              {username}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-semibold text-foreground">{repo}</span>
            <span className="ml-2 rounded-full border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground">
              Public
            </span>
          </nav>

          {/* Repo title + actions */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">
                {username}
                <span className="text-muted-foreground"> / </span>
                {repo}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-50 px-3 py-1.5 text-sm font-medium hover:bg-surface-100 dark:bg-dark-100 dark:hover:bg-dark-200">
                <Star className="h-4 w-4" />
                Star
                <span className="ml-1 rounded-full bg-surface-200 px-1.5 py-0.5 text-xs dark:bg-dark-300">
                  128
                </span>
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-50 px-3 py-1.5 text-sm font-medium hover:bg-surface-100 dark:bg-dark-100 dark:hover:bg-dark-200">
                <GitFork className="h-4 w-4" />
                Fork
                <span className="ml-1 rounded-full bg-surface-200 px-1.5 py-0.5 text-xs dark:bg-dark-300">
                  24
                </span>
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-50 px-3 py-1.5 text-sm font-medium hover:bg-surface-100 dark:bg-dark-100 dark:hover:bg-dark-200">
                <Eye className="h-4 w-4" />
                Watch
                <span className="ml-1 rounded-full bg-surface-200 px-1.5 py-0.5 text-xs dark:bg-dark-300">
                  8
                </span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <RepoTabs username={username} repo={repo} activeTab="code" />

          {/* Clone box + branch selector */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-50 px-3 py-1.5 text-sm font-medium dark:bg-dark-100">
                <Code className="h-4 w-4" />
                main
                <ChevronDown className="h-3 w-3" />
              </button>
              <span className="text-sm text-muted-foreground">
                12 branches
              </span>
              <span className="text-sm text-muted-foreground">
                47 tags
              </span>
            </div>
            <CloneBox />
          </div>

          {/* File tree */}
          <div className="mt-4 overflow-hidden rounded-lg border border-border">
            {/* File tree header */}
            <div className="flex items-center justify-between border-b border-border bg-surface-50 px-4 py-2 dark:bg-dark-100">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">johndoe</span>
                <span className="text-muted-foreground">committed 2 days ago</span>
                <span className="text-muted-foreground">·</span>
                <span className="font-mono text-xs text-brand-600">a3f7b2c</span>
              </div>
            </div>

            {/* File list */}
            <div className="divide-y divide-border">
              {fileTree.map((item) => (
                <Link
                  key={item.path}
                  href={
                    item.type === "folder"
                      ? `/${username}/${repo}/code?path=${item.path}`
                      : `/${username}/${repo}/code?file=${item.path}`
                  }
                  className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-surface-50 dark:hover:bg-dark-100 transition-colors"
                >
                  <FileIcon type={item.type} />
                  <span className="min-w-0 flex-1 font-medium">{item.name}</span>
                  <span className="hidden truncate text-xs text-muted-foreground sm:block">
                    {fileCommits[item.path]?.message}
                  </span>
                  <span className="hidden whitespace-nowrap text-xs text-muted-foreground sm:block">
                    {fileCommits[item.path]?.date}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* README */}
          <div className="mt-6 rounded-lg border border-border">
            <div className="flex items-center gap-2 border-b border-border bg-surface-50 px-4 py-2 dark:bg-dark-100">
              <FileText className="h-4 w-4" />
              <span className="text-sm font-semibold">README.md</span>
              <button className="ml-auto rounded p-1 text-muted-foreground hover:bg-surface-200 dark:hover:bg-dark-300">
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none p-6">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
                {readmeContent}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
