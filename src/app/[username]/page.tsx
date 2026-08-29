import Link from "next/link";
import {
  MapPin,
  LinkIcon,
  Twitter,
  Calendar,
  Star,
  GitFork,
  Eye,
  BookOpen,
  Users,
  Building2,
  Pencil,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const userProfile = {
  name: "Sarah Chen",
  username: "sarahchen",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarahchen",
  bio: "Full-stack developer passionate about open source. Building the future of developer tools.",
  location: "San Francisco, CA",
  website: "https://sarahchen.dev",
  twitter: "@sarahchen_dev",
  company: "CodeLand Inc.",
  joinDate: "January 2021",
  followers: 2847,
  following: 156,
  stars: 892,
  repos: 47,
  isFollowing: false,
  pronouns: "she/her",
};

const pinnedRepos = [
  {
    name: "devflow",
    description: "A modern development workflow automation tool",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 1247,
    forks: 89,
    isPrivate: false,
  },
  {
    name: "ui-kit",
    description: "Beautiful, accessible React component library",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 856,
    forks: 134,
    isPrivate: false,
  },
  {
    name: "cli-tools",
    description: "Command-line utilities for modern development",
    language: "Go",
    languageColor: "#00ADD8",
    stars: 423,
    forks: 45,
    isPrivate: false,
  },
  {
    name: "neural-search",
    description: "AI-powered code search engine",
    language: "Python",
    languageColor: "#3572A5",
    stars: 312,
    forks: 28,
    isPrivate: false,
  },
];

const allRepos = [
  ...pinnedRepos,
  {
    name: "docs",
    description: "Project documentation and guides",
    language: "MDX",
    languageColor: "#fcb32c",
    stars: 87,
    forks: 23,
    isPrivate: false,
  },
  {
    name: "api-gateway",
    description: "High-performance API gateway service",
    language: "Rust",
    languageColor: "#dea584",
    stars: 234,
    forks: 19,
    isPrivate: false,
  },
  {
    name: "mobile-app",
    description: "React Native mobile companion app",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 156,
    forks: 34,
    isPrivate: true,
  },
  {
    name: "dotfiles",
    description: "Personal development environment configuration",
    language: "Shell",
    languageColor: "#89e051",
    stars: 42,
    forks: 8,
    isPrivate: false,
  },
];

const activityFeed = [
  { type: "push", repo: "devflow", message: "Pushed 3 commits to main", time: "2 hours ago" },
  { type: "star", repo: "ui-kit", message: "Starred by @mikejones", time: "5 hours ago" },
  { type: "pr", repo: "cli-tools", message: "Merged pull request #127", time: "1 day ago" },
  { type: "issue", repo: "devflow", message: "Closed issue #89", time: "2 days ago" },
  { type: "fork", repo: "neural-search", message: "Forked by @techlead42", time: "3 days ago" },
];

const contributionData: number[][] = [];
for (let week = 0; week < 52; week++) {
  const weekData: number[] = [];
  for (let day = 0; day < 7; day++) {
    weekData.push(Math.floor(Math.random() * 5));
  }
  contributionData.push(weekData);
}

function ContributionGraph() {
  const getContributionColor = (level: number) => {
    const colors = [
      "bg-surface-100 dark:bg-dark-100",
      "bg-green-200 dark:bg-green-900",
      "bg-green-400 dark:bg-green-700",
      "bg-green-500 dark:bg-green-600",
      "bg-green-700 dark:bg-green-500",
    ];
    return colors[level];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {Math.floor(Math.random() * 1500) + 500} contributions in the last year
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="flex gap-1">
            {contributionData.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`h-3 w-3 rounded-sm ${getContributionColor(day)}`}
                    title={`${day} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-end gap-1 text-xs text-muted-foreground">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`h-3 w-3 rounded-sm ${getContributionColor(level)}`}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RepoCard({
  repo,
  username,
}: {
  repo: (typeof pinnedRepos)[0];
  username: string;
}) {
  return (
    <Card className="transition-colors hover:border-brand-300 dark:hover:border-brand-700">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <Link
              href={`/${username}/${repo.name}`}
              className="font-semibold text-brand-600 hover:underline dark:text-brand-400"
            >
              {repo.name}
            </Link>
            {repo.isPrivate && (
              <Badge variant="outline" className="text-xs">
                Private
              </Badge>
            )}
          </div>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {repo.description}
        </p>
        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: repo.languageColor }}
            />
            {repo.language}
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            {repo.stars}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="h-3 w-3" />
            {repo.forks}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = userProfile;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar */}
        <div className="w-full lg:w-80 lg:shrink-0">
          <div className="sticky top-20">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <Avatar className="h-48 w-48 border-4 border-background shadow-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-4xl">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="mt-4 w-full">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-lg text-muted-foreground">{user.username}</p>
                {user.pronouns && (
                  <p className="text-sm text-muted-foreground">
                    ({user.pronouns})
                  </p>
                )}
              </div>

              <p className="mt-4 text-sm text-muted-foreground">{user.bio}</p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground lg:justify-start">
                {user.company && (
                  <span className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {user.company}
                  </span>
                )}
                {user.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {user.location}
                  </span>
                )}
                {user.website && (
                  <Link
                    href={user.website}
                    className="flex items-center gap-1 text-brand-600 hover:underline dark:text-brand-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkIcon className="h-4 w-4" />
                    {user.website.replace("https://", "")}
                  </Link>
                )}
                {user.twitter && (
                  <span className="flex items-center gap-1">
                    <Twitter className="h-4 w-4" />
                    {user.twitter}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Joined {user.joinDate}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-4 text-sm">
                <Link
                  href={`/${username}/followers`}
                  className="hover:text-brand-600 hover:underline"
                >
                  <span className="font-semibold">{user.followers}</span>{" "}
                  <span className="text-muted-foreground">followers</span>
                </Link>
                <Link
                  href={`/${username}/following`}
                  className="hover:text-brand-600 hover:underline"
                >
                  <span className="font-semibold">{user.following}</span>{" "}
                  <span className="text-muted-foreground">following</span>
                </Link>
              </div>

              <div className="mt-4 flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  <span className="font-semibold">{user.stars}</span>
                  <span className="text-muted-foreground">stars</span>
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span className="font-semibold">{user.repos}</span>
                  <span className="text-muted-foreground">repositories</span>
                </span>
              </div>

              <div className="mt-6 flex w-full gap-2">
                <Button className="flex-1" variant={user.isFollowing ? "outline" : "default"}>
                  {user.isFollowing ? "Unfollow" : "Follow"}
                </Button>
                <Button variant="outline" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <Tabs defaultValue="overview">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="repositories">
                Repositories
                <Badge variant="secondary" className="ml-2">
                  {user.repos}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="stars">
                Stars
                <Badge variant="secondary" className="ml-2">
                  {user.stars}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-6">
              {/* Pinned Repos */}
              <div>
                <h2 className="mb-4 text-lg font-semibold">Pinned</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {pinnedRepos.map((repo) => (
                    <RepoCard key={repo.name} repo={repo} username={username} />
                  ))}
                </div>
              </div>

              {/* Contribution Graph */}
              <ContributionGraph />

              {/* Activity Feed */}
              <div>
                <h2 className="mb-4 text-lg font-semibold">Activity</h2>
                <Card>
                  <CardContent className="divide-y divide-border p-0">
                    {activityFeed.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 px-4 py-3 text-sm"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-100 dark:bg-dark-200">
                          {activity.type === "push" && (
                            <GitFork className="h-4 w-4 text-green-500" />
                          )}
                          {activity.type === "star" && (
                            <Star className="h-4 w-4 text-yellow-500" />
                          )}
                          {activity.type === "pr" && (
                            <GitFork className="h-4 w-4 text-purple-500" />
                          )}
                          {activity.type === "issue" && (
                            <Eye className="h-4 w-4 text-blue-500" />
                          )}
                          {activity.type === "fork" && (
                            <GitFork className="h-4 w-4 text-orange-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate">{activity.message}</p>
                          <p className="text-xs text-muted-foreground">
                            <Link
                              href={`/${username}/${activity.repo}`}
                              className="hover:text-brand-600 hover:underline"
                            >
                              {activity.repo}
                            </Link>{" "}
                            · {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="repositories" className="mt-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Find a repository..."
                    className="max-w-sm"
                  />
                  <Button variant="outline">Type: All</Button>
                  <Button variant="outline">Language: All</Button>
                  <Button variant="outline">Sort: Last updated</Button>
                </div>

                <div className="divide-y divide-border rounded-lg border">
                  {allRepos.map((repo) => (
                    <div
                      key={repo.name}
                      className="flex items-start justify-between p-4 hover:bg-surface-50 dark:hover:bg-dark-100"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/${username}/${repo.name}`}
                            className="font-semibold text-brand-600 hover:underline dark:text-brand-400"
                          >
                            {repo.name}
                          </Link>
                          {repo.isPrivate && (
                            <Badge variant="outline" className="text-xs">
                              Private
                            </Badge>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {repo.description}
                        </p>
                        <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                          {repo.language && (
                            <span className="flex items-center gap-1">
                              <span
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: repo.languageColor }}
                              />
                              {repo.language}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            {repo.stars}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork className="h-3 w-3" />
                            {repo.forks}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="projects" className="mt-6">
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">
                    No projects yet
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Projects help organize your work into boards.
                  </p>
                  <Button className="mt-4">Create a project</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stars" className="mt-6">
              <div className="flex flex-col gap-4">
                <Input
                  placeholder="Search stars..."
                  className="max-w-sm"
                />
                <div className="divide-y divide-border rounded-lg border">
                  {[
                    {
                      owner: "vercel",
                      name: "next.js",
                      desc: "The React Framework for the Web",
                      lang: "TypeScript",
                      color: "#3178c6",
                      stars: 128000,
                    },
                    {
                      owner: "facebook",
                      name: "react",
                      desc: "The library for web and native user interfaces",
                      lang: "JavaScript",
                      color: "#f1e05a",
                      stars: 231000,
                    },
                    {
                      owner: "denoland",
                      name: "deno",
                      desc: "A modern runtime for JavaScript and TypeScript",
                      lang: "Rust",
                      color: "#dea584",
                      stars: 97000,
                    },
                  ].map((repo) => (
                    <div
                      key={`${repo.owner}/${repo.name}`}
                      className="p-4 hover:bg-surface-50 dark:hover:bg-dark-100"
                    >
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/${repo.owner}/${repo.name}`}
                          className="font-semibold text-brand-600 hover:underline dark:text-brand-400"
                        >
                          {repo.owner}/{repo.name}
                        </Link>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {repo.desc}
                      </p>
                      <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <span
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: repo.color }}
                          />
                          {repo.lang}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {repo.stars.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
