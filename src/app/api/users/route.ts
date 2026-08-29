import { NextRequest, NextResponse } from "next/server";

interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  location: string;
  company: string;
  website: string;
  twitter: string;
  repos: number;
  followers: number;
  following: number;
  joinedAt: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    username: "sarah-chen",
    displayName: "Sarah Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    bio: "Full-stack developer passionate about TypeScript and developer tools.",
    location: "San Francisco, CA",
    company: "CodeLand",
    website: "https://sarahchen.dev",
    twitter: "@sarahcodes",
    repos: 42,
    followers: 1200,
    following: 180,
    joinedAt: "2021-03-15T00:00:00Z",
  },
  {
    id: "2",
    username: "alex-rivera",
    displayName: "Alex Rivera",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    bio: "UI/UX designer turned developer. Building beautiful interfaces.",
    location: "Austin, TX",
    company: "Freelance",
    website: "https://alexrivera.design",
    twitter: "@alexdesigns",
    repos: 28,
    followers: 890,
    following: 245,
    joinedAt: "2020-07-22T00:00:00Z",
  },
  {
    id: "3",
    username: "marcus-dev",
    displayName: "Marcus Thompson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus",
    bio: "Backend engineer specializing in distributed systems and Rust.",
    location: "Berlin, Germany",
    company: "TechCorp",
    website: "https://marcust.dev",
    twitter: "@marcusrust",
    repos: 15,
    followers: 560,
    following: 92,
    joinedAt: "2022-01-10T00:00:00Z",
  },
  {
    id: "4",
    username: "yuki-tanaka",
    displayName: "Yuki Tanaka",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=yuki",
    bio: "DevOps specialist and cloud architect. Kubernetes enthusiast.",
    location: "Tokyo, Japan",
    company: "CloudScale",
    website: "https://yukitanaka.io",
    twitter: "@yukidevops",
    repos: 33,
    followers: 2100,
    following: 310,
    joinedAt: "2019-11-05T00:00:00Z",
  },
  {
    id: "5",
    username: "priya-patel",
    displayName: "Priya Patel",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
    bio: "ML engineer and open source advocate. Building AI tools.",
    location: "London, UK",
    company: "AI Labs",
    website: "https://priyapatel.ai",
    twitter: "@priyamlops",
    repos: 19,
    followers: 3400,
    following: 420,
    joinedAt: "2020-04-18T00:00:00Z",
  },
  {
    id: "6",
    username: "omar-hassan",
    displayName: "Omar Hassan",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=omar",
    bio: "Mobile developer specializing in React Native and Flutter.",
    location: "Dubai, UAE",
    company: "AppWorks",
    website: "https://omarh.dev",
    twitter: "@omarmobile",
    repos: 24,
    followers: 670,
    following: 155,
    joinedAt: "2021-08-30T00:00:00Z",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "joined";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") || "10", 10);

  let filtered = [...mockUsers];

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (u) =>
        u.username.toLowerCase().includes(q) ||
        u.displayName.toLowerCase().includes(q) ||
        u.bio.toLowerCase().includes(q)
    );
  }

  if (sort === "followers") {
    filtered.sort((a, b) => b.followers - a.followers);
  } else if (sort === "repos") {
    filtered.sort((a, b) => b.repos - a.repos);
  } else {
    filtered.sort(
      (a, b) =>
        new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime()
    );
  }

  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  return NextResponse.json({
    users: paginated,
    total: filtered.length,
    page,
    perPage,
    totalPages: Math.ceil(filtered.length / perPage),
  });
}
