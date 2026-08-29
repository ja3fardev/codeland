import { NextRequest, NextResponse } from "next/server";

interface Repo {
  id: string;
  name: string;
  fullName: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  owner: string;
  updatedAt: string;
  isPrivate: boolean;
  topics: string[];
}

const mockRepos: Repo[] = [
  {
    id: "1",
    name: "next-auth",
    fullName: "codeLand/next-auth",
    description: "Open source authentication solution for Next.js",
    language: "TypeScript",
    stars: 25430,
    forks: 3210,
    owner: "codeLand",
    updatedAt: "2026-08-28T10:00:00Z",
    isPrivate: false,
    topics: ["auth", "nextjs", "oauth", "jwt"],
  },
  {
    id: "2",
    name: "shadcn-ui",
    fullName: "codeLand/shadcn-ui",
    description: "Beautifully designed components built with Radix UI and Tailwind CSS",
    language: "TypeScript",
    stars: 89200,
    forks: 5430,
    owner: "codeLand",
    updatedAt: "2026-08-27T15:30:00Z",
    isPrivate: false,
    topics: ["ui", "components", "tailwind", "radix"],
  },
  {
    id: "3",
    name: "codeland-ide",
    fullName: "codeLand/codeland-ide",
    description: "AI-powered code editor built on Monaco",
    language: "TypeScript",
    stars: 12300,
    forks: 890,
    owner: "codeLand",
    updatedAt: "2026-08-29T08:00:00Z",
    isPrivate: false,
    topics: ["editor", "ai", "monaco", "vscode"],
  },
  {
    id: "4",
    name: "drizzle-orm",
    fullName: "codeLand/drizzle-orm",
    description: "TypeScript ORM for SQL databases",
    language: "TypeScript",
    stars: 45600,
    forks: 2100,
    owner: "codeLand",
    updatedAt: "2026-08-26T12:00:00Z",
    isPrivate: false,
    topics: ["orm", "database", "typescript", "sql"],
  },
  {
    id: "5",
    name: "private-api",
    fullName: "codeLand/private-api",
    description: "Internal API service for CodeLand platform",
    language: "Go",
    stars: 156,
    forks: 12,
    owner: "codeLand",
    updatedAt: "2026-08-25T09:00:00Z",
    isPrivate: true,
    topics: ["api", "go", "internal"],
  },
  {
    id: "6",
    name: "motion-primitives",
    fullName: "codeLand/motion-primitives",
    description: "Animated UI components for React and Next.js",
    language: "TypeScript",
    stars: 8900,
    forks: 420,
    owner: "codeLand",
    updatedAt: "2026-08-28T14:00:00Z",
    isPrivate: false,
    topics: ["animation", "react", "framer-motion", "components"],
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "updated";
  const language = searchParams.get("language") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") || "10", 10);

  let filtered = [...mockRepos];

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.topics.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (language) {
    filtered = filtered.filter(
      (r) => r.language.toLowerCase() === language.toLowerCase()
    );
  }

  if (sort === "stars") {
    filtered.sort((a, b) => b.stars - a.stars);
  } else if (sort === "forks") {
    filtered.sort((a, b) => b.forks - a.forks);
  } else {
    filtered.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }

  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  return NextResponse.json({
    repos: paginated,
    total: filtered.length,
    page,
    perPage,
    totalPages: Math.ceil(filtered.length / perPage),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, isPrivate } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Repository name is required" },
        { status: 400 }
      );
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9-]/g, "-");

    const newRepo: Repo = {
      id: Date.now().toString(),
      name: slug,
      fullName: `codeLand/${slug}`,
      description: description || "",
      language: "TypeScript",
      stars: 0,
      forks: 0,
      owner: "codeLand",
      updatedAt: new Date().toISOString(),
      isPrivate: isPrivate || false,
      topics: [],
    };

    mockRepos.push(newRepo);

    return NextResponse.json({ repo: newRepo }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create repository" },
      { status: 500 }
    );
  }
}
