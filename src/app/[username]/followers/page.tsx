import Link from "next/link";
import { Users, ArrowLeft } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const followers = [
  {
    name: "Mike Johnson",
    username: "mikej",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mikej",
    bio: "Backend engineer. Rust enthusiast. Coffee addict.",
    isFollowing: true,
  },
  {
    name: "Emily Zhang",
    username: "emilyz",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emilyz",
    bio: "Design engineer. Building beautiful interfaces at @startup",
    isFollowing: false,
  },
  {
    name: "Alex Rivera",
    username: "alexr",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alexr",
    bio: "DevOps engineer. Automating all the things.",
    isFollowing: true,
  },
  {
    name: "Jordan Lee",
    username: "jordanl",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jordanl",
    bio: "Mobile developer. React Native & Flutter",
    isFollowing: false,
  },
  {
    name: "Taylor Swift",
    username: "taylors",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=taylors",
    bio: "Full-stack developer. Open source contributor.",
    isFollowing: true,
  },
  {
    name: "Sam Patel",
    username: "samp",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=samp",
    bio: "ML engineer. Building intelligent systems.",
    isFollowing: false,
  },
  {
    name: "Chris Wang",
    username: "chrisw",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chrisw",
    bio: "Security researcher. Bug bounty hunter.",
    isFollowing: true,
  },
];

export default async function FollowersPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link
          href={`/${username}`}
          className="mb-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to profile
        </Link>
        <div className="flex items-center gap-3">
          <Users className="h-6 w-6" />
          <h1 className="text-2xl font-bold">
            {username}&apos;s followers
          </h1>
          <span className="rounded-full bg-surface-200 px-2.5 py-0.5 text-sm font-medium dark:bg-dark-300">
            {followers.length}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {followers.map((follower) => (
          <Card key={follower.username}>
            <CardContent className="flex items-center gap-4 p-4">
              <Link href={`/${follower.username}`}>
                <Avatar className="h-12 w-12">
                  <AvatarImage src={follower.avatar} alt={follower.name} />
                  <AvatarFallback>
                    {follower.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/${follower.username}`}
                    className="font-semibold hover:text-brand-600 hover:underline"
                  >
                    {follower.name}
                  </Link>
                  <span className="text-sm text-muted-foreground">
                    @{follower.username}
                  </span>
                </div>
                <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                  {follower.bio}
                </p>
              </div>
              <Button
                variant={follower.isFollowing ? "outline" : "default"}
                size="sm"
              >
                {follower.isFollowing ? "Following" : "Follow"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
