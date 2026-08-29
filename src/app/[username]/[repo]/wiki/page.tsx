import Link from "next/link";
import {
  BookOpen,
  Pencil,
  ChevronRight,
  Home,
  Code,
  GitBranch,
  AlertCircle,
  GitPullRequest,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const wikiPages = [
  { slug: "home", title: "Home", isHome: true },
  { slug: "getting-started", title: "Getting Started" },
  { slug: "installation", title: "Installation" },
  { slug: "configuration", title: "Configuration" },
  { slug: "api-reference", title: "API Reference" },
  { slug: "contributing", title: "Contributing" },
  { slug: "changelog", title: "Changelog" },
  { slug: "faq", title: "FAQ" },
  { slug: "troubleshooting", title: "Troubleshooting" },
  { slug: "roadmap", title: "Roadmap" },
];

const wikiContent: Record<string, { title: string; content: string }> = {
  home: {
    title: "Welcome to CodeLand Wiki",
    content: `# Welcome to CodeLand Wiki

CodeLand is a revolutionary developer platform built for the next generation of software engineers. This wiki contains comprehensive documentation, guides, and reference materials to help you get the most out of CodeLand.

## Quick Links

- [Getting Started](/getting-started) - New to CodeLand? Start here
- [Installation](/installation) - Set up your development environment
- [Configuration](/configuration) - Customize CodeLand to your needs
- [API Reference](/api-reference) - Detailed API documentation

## Features

### Real-time Collaboration
Work together with your team in real-time. See changes as they happen, review code together, and ship faster.

### AI-Powered Code Review
Get instant feedback on your pull requests with our AI-powered code review system. Catch bugs, suggest improvements, and enforce best practices.

### Integrated CI/CD
Automate your deployment pipeline with built-in CI/CD. Connect to your favorite cloud providers and deploy with confidence.

### Security Scanning
Detect vulnerabilities before they reach production with our comprehensive security scanning tools.

## Community

Join our growing community of developers:
- [Discord](https://discord.gg/codeland)
- [Twitter](https://twitter.com/codeland)
- [GitHub Discussions](https://github.com/codeland/codeland/discussions)

## Support

If you need help, check out our:
- [FAQ](/faq) for common questions
- [Troubleshooting](/troubleshooting) guide for known issues
- [Roadmap](/roadmap) to see what's coming next`,
  },
  "getting-started": {
    title: "Getting Started",
    content: `# Getting Started with CodeLand

This guide will walk you through the basics of getting started with CodeLand.

## Prerequisites

Before you begin, make sure you have the following installed:
- Node.js 18.0 or later
- npm, yarn, or pnpm
- Git

## Step 1: Create an Account

1. Visit [codeland.dev](https://codeland.dev)
2. Click "Sign Up" in the top right corner
3. Fill in your details and verify your email

## Step 2: Install the CLI

\`\`\`bash
npm install -g @codeland/cli
\`\`\`

## Step 3: Authenticate

\`\`\`bash
codeland login
\`\`\`

This will open your browser to authenticate with your CodeLand account.

## Step 4: Create Your First Project

\`\`\`bash
codeland init my-project
cd my-project
codeland dev
\`\`\`

Your project is now running at http://localhost:3000!

## Next Steps

- [Configuration](/configuration) - Learn how to configure your project
- [API Reference](/api-reference) - Explore the CodeLand API
- [Contributing](/contributing) - Help improve CodeLand`,
  },
  installation: {
    title: "Installation",
    content: `# Installation Guide

## System Requirements

- **OS**: macOS 10.15+, Windows 10+, Ubuntu 20.04+
- **Node.js**: 18.0 or later
- **Memory**: 4GB RAM minimum, 8GB recommended
- **Disk Space**: 500MB for the CLI, additional space for projects

## Installing the CLI

### Using npm

\`\`\`bash
npm install -g @codeland/cli
\`\`\`

### Using yarn

\`\`\`bash
yarn global add @codeland/cli
\`\`\`

### Using pnpm

\`\`\`bash
pnpm add -g @codeland/cli
\`\`\`

## Verifying Installation

\`\`\`bash
codeland --version
\`\`\`

## Updating

To update to the latest version:

\`\`\`bash
npm update -g @codeland/cli
\`\`\`

## Uninstalling

\`\`\`bash
npm uninstall -g @codeland/cli
\`\`\``,
  },
  configuration: {
    title: "Configuration",
    content: `# Configuration

CodeLand can be configured using a \`codeland.config.js\` file in your project root.

## Basic Configuration

\`\`\`javascript
// codeland.config.js
module.exports = {
  name: "my-project",
  version: "1.0.0",
  port: 3000,
  env: "development",
};
\`\`\`

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| name | string | - | Project name |
| version | string | "1.0.0" | Project version |
| port | number | 3000 | Development server port |
| env | string | "development" | Environment mode |
| plugins | array | [] | List of plugins to enable |

## Environment Variables

Create a \`.env\` file in your project root:

\`\`\`
CODELAND_API_KEY=your_api_key
CODELAND_SECRET=your_secret
\`\`\`

## Advanced Configuration

See the [API Reference](/api-reference) for more detailed configuration options.`,
  },
  "api-reference": {
    title: "API Reference",
    content: `# API Reference

## Authentication

All API requests require authentication via Bearer token:

\`\`\`
Authorization: Bearer YOUR_API_TOKEN
\`\`\`

## Endpoints

### Projects

#### List Projects
\`\`\`
GET /api/v1/projects
\`\`\`

#### Get Project
\`\`\`
GET /api/v1/projects/:id
\`\`\`

#### Create Project
\`\`\`
POST /api/v1/projects
\`\`\`

### Deployments

#### List Deployments
\`\`\`
GET /api/v1/projects/:id/deployments
\`\`\`

#### Create Deployment
\`\`\`
POST /api/v1/projects/:id/deployments
\`\`\`

### Users

#### Get Current User
\`\`\`
GET /api/v1/user
\`\`\`

#### Update User
\`\`\`
PATCH /api/v1/user
\`\`\`

## Rate Limiting

API requests are limited to 1000 requests per hour per API key.

## Webhooks

Configure webhooks to receive notifications about events in your projects. See the [webhooks documentation](/webhooks) for more details.`,
  },
};

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
            tab.id === "wiki"
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

export default async function WikiPage({
  params,
}: {
  params: Promise<{ username: string; repo: string }>;
}) {
  const { username, repo } = await params;

  const currentPage = wikiContent["home"];

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
            <span className="font-semibold text-foreground">Wiki</span>
          </nav>

          {/* Repo tabs */}
          <RepoTabs username={username} repo={repo} />

          <div className="mt-6 flex gap-6">
            {/* Sidebar */}
            <aside className="w-64 shrink-0">
              <div className="sticky top-20">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Wiki</h2>
                  <Button variant="outline" size="sm">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>

                <nav className="space-y-1">
                  {wikiPages.map((page) => (
                    <Link
                      key={page.slug}
                      href={`/${username}/${repo}/wiki?slug=${page.slug}`}
                      className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                        page.slug === "home"
                          ? "bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300"
                          : "text-muted-foreground hover:bg-surface-50 hover:text-foreground dark:hover:bg-dark-100"
                      }`}
                    >
                      {page.isHome ? (
                        <Home className="h-4 w-4" />
                      ) : (
                        <BookOpen className="h-4 w-4" />
                      )}
                      {page.title}
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 min-w-0">
              <Card>
                <CardContent className="p-8">
                  <div className="prose prose-surface dark:prose-invert max-w-none">
                    {currentPage.content.split("\n").map((line, i) => {
                      if (line.startsWith("# ")) {
                        return (
                          <h1 key={i} className="text-3xl font-bold">
                            {line.replace("# ", "")}
                          </h1>
                        );
                      }
                      if (line.startsWith("## ")) {
                        return (
                          <h2 key={i} className="mt-8 text-2xl font-semibold">
                            {line.replace("## ", "")}
                          </h2>
                        );
                      }
                      if (line.startsWith("### ")) {
                        return (
                          <h3 key={i} className="mt-6 text-xl font-semibold">
                            {line.replace("### ", "")}
                          </h3>
                        );
                      }
                      if (line.startsWith("- ")) {
                        return (
                          <li key={i} className="ml-4 text-muted-foreground">
                            {line.replace("- ", "")}
                          </li>
                        );
                      }
                      if (line.startsWith("```")) {
                        return null;
                      }
                      if (line.includes("|") && line.includes("---")) {
                        return null;
                      }
                      if (line.startsWith("|")) {
                        const cells = line
                          .split("|")
                          .filter((c) => c.trim())
                          .map((c) => c.trim());
                        return (
                          <div key={i} className="flex gap-4 text-sm">
                            {cells.map((cell, j) => (
                              <span key={j} className="flex-1">
                                {cell}
                              </span>
                            ))}
                          </div>
                        );
                      }
                      if (line.trim() === "") {
                        return <br key={i} />;
                      }
                      return (
                        <p key={i} className="text-muted-foreground">
                          {line}
                        </p>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
