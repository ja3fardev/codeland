import { NextRequest, NextResponse } from "next/server";

interface Issue {
  id: string;
  number: number;
  title: string;
  description: string;
  state: "open" | "closed" | "in_progress";
  author: string;
  assignee: string | null;
  labels: string[];
  repo: string;
  comments: number;
  createdAt: string;
  updatedAt: string;
}

const mockIssues: Issue[] = [
  {
    id: "1",
    number: 1024,
    title: "TypeError when using useSession hook",
    description:
      "Getting a runtime error when calling useSession in a client component. The error occurs after upgrading to v5.",
    state: "open",
    author: "sarah-chen",
    assignee: "alex-rivera",
    labels: ["bug", "priority:high"],
    repo: "next-auth",
    comments: 12,
    createdAt: "2026-08-25T10:00:00Z",
    updatedAt: "2026-08-28T15:30:00Z",
  },
  {
    id: "2",
    number: 892,
    title: "Dark mode not persisting after page refresh",
    description:
      "Theme preference resets to system default on reload. LocalStorage seems to not be working correctly.",
    state: "open",
    author: "marcus-dev",
    assignee: null,
    labels: ["bug", "area:theming"],
    repo: "shadcn-ui",
    comments: 5,
    createdAt: "2026-08-26T14:00:00Z",
    updatedAt: "2026-08-27T09:00:00Z",
  },
  {
    id: "3",
    number: 156,
    title: "Add support for custom keybindings",
    description:
      "Feature request to allow users to customize keyboard shortcuts. Would be great for power users who have specific workflows.",
    state: "open",
    author: "yuki-tanaka",
    assignee: "priya-patel",
    labels: ["enhancement", "area:editor"],
    repo: "codeland-ide",
    comments: 8,
    createdAt: "2026-08-20T08:00:00Z",
    updatedAt: "2026-08-29T10:00:00Z",
  },
  {
    id: "4",
    number: 45,
    title: "Connection pool exhaustion under high load",
    description:
      "When running concurrent queries, the connection pool gets exhausted and new connections hang indefinitely.",
    state: "in_progress",
    author: "omar-hassan",
    assignee: "sarah-chen",
    labels: ["bug", "priority:critical", "area:connection"],
    repo: "drizzle-orm",
    comments: 22,
    createdAt: "2026-08-15T12:00:00Z",
    updatedAt: "2026-08-29T08:00:00Z",
  },
  {
    id: "5",
    number: 312,
    title: "AnimatePresence not triggering exit animations",
    description:
      "Exit animations are not being triggered when items are removed from a list. Works fine in development but fails in production builds.",
    state: "open",
    author: "alex-rivera",
    assignee: null,
    labels: ["bug", "area:animation"],
    repo: "motion-primitives",
    comments: 3,
    createdAt: "2026-08-27T16:00:00Z",
    updatedAt: "2026-08-28T11:00:00Z",
  },
  {
    id: "6",
    number: 78,
    title: "JWT token refresh fails silently",
    description:
      "Token refresh endpoint returns 401 but no error is thrown, leading to stale tokens being used.",
    state: "closed",
    author: "priya-patel",
    assignee: "sarah-chen",
    labels: ["bug", "area:auth"],
    repo: "next-auth",
    comments: 15,
    createdAt: "2026-08-10T09:00:00Z",
    updatedAt: "2026-08-22T14:00:00Z",
  },
  {
    id: "7",
    number: 201,
    title: "Add dark mode toggle component",
    description:
      "Need a proper dark mode toggle component with system preference detection and localStorage persistence.",
    state: "closed",
    author: "marcus-dev",
    assignee: "alex-rivera",
    labels: ["enhancement", "area:theming"],
    repo: "shadcn-ui",
    comments: 9,
    createdAt: "2026-08-01T11:00:00Z",
    updatedAt: "2026-08-15T10:00:00Z",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const repo = searchParams.get("repo") || "";
  const state = searchParams.get("state") || "";
  const author = searchParams.get("author") || "";
  const label = searchParams.get("label") || "";
  const sort = searchParams.get("sort") || "created";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") || "10", 10);

  let filtered = [...mockIssues];

  if (repo) {
    filtered = filtered.filter((i) => i.repo === repo);
  }

  if (state) {
    filtered = filtered.filter((i) => i.state === state);
  }

  if (author) {
    filtered = filtered.filter((i) => i.author === author);
  }

  if (label) {
    filtered = filtered.filter((i) => i.labels.includes(label));
  }

  if (sort === "updated") {
    filtered.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  } else if (sort === "comments") {
    filtered.sort((a, b) => b.comments - a.comments);
  } else {
    filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  return NextResponse.json({
    issues: paginated,
    total: filtered.length,
    page,
    perPage,
    totalPages: Math.ceil(filtered.length / perPage),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, repo, labels } = body;

    if (!title || typeof title !== "string") {
      return NextResponse.json(
        { error: "Issue title is required" },
        { status: 400 }
      );
    }

    if (!repo || typeof repo !== "string") {
      return NextResponse.json(
        { error: "Repository name is required" },
        { status: 400 }
      );
    }

    const existingIssues = mockIssues.filter((i) => i.repo === repo);
    const nextNumber =
      existingIssues.length > 0
        ? Math.max(...existingIssues.map((i) => i.number)) + 1
        : 1;

    const newIssue: Issue = {
      id: Date.now().toString(),
      number: nextNumber,
      title,
      description: description || "",
      state: "open",
      author: "current-user",
      assignee: null,
      labels: labels || [],
      repo,
      comments: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockIssues.push(newIssue);

    return NextResponse.json({ issue: newIssue }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create issue" },
      { status: 500 }
    );
  }
}
