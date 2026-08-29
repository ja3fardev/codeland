"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Star,
  GitFork,
  Code,
  FileText,
  Users,
  AlertCircle,
  Filter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const repoResults = [
  {
    owner: "vercel",
    name: "next.js",
    description: "The React Framework for the Web",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 128000,
    forks: 27000,
    updated: "2 hours ago",
  },
  {
    owner: "facebook",
    name: "react",
    description: "The library for web and native user interfaces",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 231000,
    forks: 47000,
    updated: "5 hours ago",
  },
  {
    owner: "vuejs",
    name: "core",
    description: "Vue.js is a progressive JavaScript framework",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 46000,
    forks: 8200,
    updated: "1 day ago",
  },
  {
    owner: "sveltejs",
    name: "svelte",
    description: "Cybernetically enhanced web apps",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 80000,
    forks: 4300,
    updated: "3 days ago",
  },
];

const codeResults = [
  {
    file: "src/app/layout.tsx",
    repo: "vercel/next.js",
    match: "export default function RootLayout({ children })",
    line: 15,
  },
  {
    file: "packages/react-dom/src/client.js",
    repo: "facebook/react",
    match: "export function createRoot(container) {",
    line: 42,
  },
  {
    file: "src/runtime-core/component.ts",
    repo: "vuejs/core",
    match: "export function createComponent(instance) {",
    line: 89,
  },
  {
    file: "src/compiler/index.js",
    repo: "sveltejs/svelte",
    match: "export function compile(source, options) {",
    line: 23,
  },
];

const issueResults = [
  {
    title: "Fix hydration mismatch error in dev mode",
    repo: "vercel/next.js",
    number: 58923,
    state: "open",
    labels: ["bug", "priority:high"],
    author: "mikej",
    created: "2 days ago",
  },
  {
    title: "Feature request: Server Components streaming",
    repo: "vercel/next.js",
    number: 58924,
    state: "open",
    labels: ["enhancement"],
    author: "sarahchen",
    created: "3 days ago",
  },
  {
    title: "Memory leak in useEffect cleanup",
    repo: "facebook/react",
    number: 27845,
    state: "closed",
    labels: ["bug"],
    author: "alexr",
    created: "1 week ago",
  },
  {
    title: "Improve TypeScript inference for props",
    repo: "vuejs/core",
    number: 10234,
    state: "open",
    labels: ["enhancement", "typescript"],
    author: "emilyz",
    created: "4 days ago",
  },
];

const userResults = [
  {
    name: "Sarah Chen",
    username: "sarahchen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarahchen",
    bio: "Full-stack developer passionate about open source",
    repos: 47,
    followers: 2847,
  },
  {
    name: "Mike Johnson",
    username: "mikej",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mikej",
    bio: "Backend engineer. Rust enthusiast.",
    repos: 32,
    followers: 1234,
  },
  {
    name: "Emily Zhang",
    username: "emilyz",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emilyz",
    bio: "Design engineer. Building beautiful interfaces.",
    repos: 28,
    followers: 892,
  },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search repositories, code, issues, users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 text-lg"
          />
        </div>
      </div>

      <Tabs defaultValue="repositories">
        <TabsList className="mb-6">
          <TabsTrigger value="repositories" className="gap-2">
            <FileText className="h-4 w-4" />
            Repositories
            <Badge variant="secondary">{repoResults.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="code" className="gap-2">
            <Code className="h-4 w-4" />
            Code
            <Badge variant="secondary">{codeResults.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="issues" className="gap-2">
            <AlertCircle className="h-4 w-4" />
            Issues
            <Badge variant="secondary">{issueResults.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            Users
            <Badge variant="secondary">{userResults.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="repositories">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {repoResults.length} results for repositories matching &quot;{query || "all"}&quot;
            </p>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
          <div className="mt-4 space-y-4">
            {repoResults.map((repo) => (
              <Card key={`${repo.owner}/${repo.name}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link
                        href={`/${repo.owner}/${repo.name}`}
                        className="text-lg font-semibold text-brand-600 hover:underline dark:text-brand-400"
                      >
                        {repo.owner}/{repo.name}
                      </Link>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {repo.description}
                      </p>
                      <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <span
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: repo.languageColor }}
                          />
                          {repo.language}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {repo.stars.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="h-3 w-3" />
                          {repo.forks.toLocaleString()}
                        </span>
                        <span>Updated {repo.updated}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="code">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {codeResults.length} code results matching &quot;{query || "all"}&quot;
            </p>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
          <div className="mt-4 space-y-4">
            {codeResults.map((result, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{result.repo}</span>
                    <span>/</span>
                    <span className="font-medium">{result.file}</span>
                  </div>
                  <pre className="mt-3 overflow-x-auto rounded-md bg-surface-50 p-3 font-mono text-xs dark:bg-dark-100">
                    <code>{result.match}</code>
                  </pre>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Line {result.line}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="issues">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {issueResults.length} issues matching &quot;{query || "all"}&quot;
            </p>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
          <div className="mt-4 space-y-4">
            {issueResults.map((issue) => (
              <Card key={issue.number}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle
                      className={`mt-0.5 h-4 w-4 ${
                        issue.state === "open"
                          ? "text-green-500"
                          : "text-purple-500"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{issue.title}</span>
                        <span className="text-sm text-muted-foreground">
                          #{issue.number}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        <Link
                          href={`/${issue.repo.split("/")[0]}/${issue.repo.split("/")[1]}`}
                          className="hover:text-brand-600 hover:underline"
                        >
                          {issue.repo}
                        </Link>{" "}
                        · opened {issue.created} by {issue.author}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {issue.labels.map((label) => (
                          <Badge key={label} variant="secondary" className="text-xs">
                            {label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="users">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {userResults.length} users matching &quot;{query || "all"}&quot;
            </p>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
          <div className="mt-4 space-y-4">
            {userResults.map((user) => (
              <Card key={user.username}>
                <CardContent className="flex items-center gap-4 p-4">
                  <Link href={`/${user.username}`}>
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/${user.username}`}
                        className="font-semibold hover:text-brand-600 hover:underline"
                      >
                        {user.name}
                      </Link>
                      <span className="text-sm text-muted-foreground">
                        @{user.username}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {user.bio}
                    </p>
                    <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{user.repos} repositories</span>
                      <span>{user.followers.toLocaleString()} followers</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Follow
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
