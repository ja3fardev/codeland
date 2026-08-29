import { NextRequest, NextResponse } from "next/server";

interface SearchResult {
  type: "repo" | "user" | "issue";
  id: string;
  title: string;
  description: string;
  url: string;
  metadata: Record<string, string | number>;
}

const mockRepos: SearchResult[] = [
  {
    type: "repo",
    id: "r1",
    title: "codeLand/next-auth",
    description: "Open source authentication solution for Next.js",
    url: "/codeLand/next-auth",
    metadata: { language: "TypeScript", stars: 25430 },
  },
  {
    type: "repo",
    id: "r2",
    title: "codeLand/shadcn-ui",
    description: "Beautifully designed components built with Radix UI and Tailwind CSS",
    url: "/codeLand/shadcn-ui",
    metadata: { language: "TypeScript", stars: 89200 },
  },
  {
    type: "repo",
    id: "r3",
    title: "codeLand/codeland-ide",
    description: "AI-powered code editor built on Monaco",
    url: "/codeLand/codeland-ide",
    metadata: { language: "TypeScript", stars: 12300 },
  },
  {
    type: "repo",
    id: "r4",
    title: "codeLand/drizzle-orm",
    description: "TypeScript ORM for SQL databases",
    url: "/codeLand/drizzle-orm",
    metadata: { language: "TypeScript", stars: 45600 },
  },
  {
    type: "repo",
    id: "r5",
    title: "codeLand/motion-primitives",
    description: "Animated UI components for React and Next.js",
    url: "/codeLand/motion-primitives",
    metadata: { language: "TypeScript", stars: 8900 },
  },
];

const mockUsers: SearchResult[] = [
  {
    type: "user",
    id: "u1",
    title: "sarah-chen",
    description: "Full-stack developer, open source contributor",
    url: "/sarah-chen",
    metadata: { repos: 42, followers: 1200 },
  },
  {
    type: "user",
    id: "u2",
    title: "alex-rivera",
    description: "UI/UX designer and React developer",
    url: "/alex-rivera",
    metadata: { repos: 28, followers: 890 },
  },
  {
    type: "user",
    id: "u3",
    title: "marcus-dev",
    description: "Backend engineer, Rust enthusiast",
    url: "/marcus-dev",
    metadata: { repos: 15, followers: 560 },
  },
  {
    type: "user",
    id: "u4",
    title: "yuki-tanaka",
    description: "DevOps specialist, cloud architect",
    url: "/yuki-tanaka",
    metadata: { repos: 33, followers: 2100 },
  },
];

const mockIssues: SearchResult[] = [
  {
    type: "issue",
    id: "i1",
    title: "TypeError when using useSession hook",
    description: "Getting a runtime error when calling useSession in a client component",
    url: "/codeLand/next-auth/issues/1024",
    metadata: { state: "open", repo: "next-auth" },
  },
  {
    type: "issue",
    id: "i2",
    title: "Dark mode not persisting after page refresh",
    description: "Theme preference resets to system default on reload",
    url: "/codeLand/shadcn-ui/issues/892",
    metadata: { state: "open", repo: "shadcn-ui" },
  },
  {
    type: "issue",
    id: "i3",
    title: "Add support for custom keybindings",
    description: "Feature request to allow users to customize keyboard shortcuts",
    url: "/codeLand/codeland-ide/issues/156",
    metadata: { state: "open", repo: "codeland-ide" },
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || searchParams.get("query") || "";
  const type = searchParams.get("type") || "all";

  if (!query) {
    return NextResponse.json(
      { error: "Search query is required" },
      { status: 400 }
    );
  }

  const q = query.toLowerCase();
  let results: SearchResult[] = [];

  if (type === "all" || type === "repos") {
    results = results.concat(
      mockRepos.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q)
      )
    );
  }

  if (type === "all" || type === "users") {
    results = results.concat(
      mockUsers.filter(
        (u) =>
          u.title.toLowerCase().includes(q) ||
          u.description.toLowerCase().includes(q)
      )
    );
  }

  if (type === "all" || type === "issues") {
    results = results.concat(
      mockIssues.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)
      )
    );
  }

  return NextResponse.json({
    results,
    total: results.length,
    query,
    type,
  });
}
