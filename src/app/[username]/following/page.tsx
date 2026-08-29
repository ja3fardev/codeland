import Link from "next/link";
import { Users, ArrowLeft } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const following = [
  {
    name: "Dan Abramov",
    username: "dan_abramov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dan_abramov",
    bio: "Working on @reactjs. Co-author of Redux.",
    isFollowing: true,
  },
  {
    name: "Sindre Sorhus",
    username: "sindresorhus",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sindresorhus",
    bio: "Full-time open sourcerer. Creator of AVA and PureScript.",
    isFollowing: true,
  },
  {
    name: "Sarah Drasner",
    username: "sarah_edo",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah_edo",
    bio: "VP of Developer Experience at Netlify.",
    isFollowing: true,
  },
  {
    name: "Wes Bos",
    username: "wesbos",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=wesbos",
    bio: "Full Stack Developer. Creator of really good web tutorials.",
    isFollowing: true,
  },
  {
    name: "Addy Osmani",
    username: "addyosmani",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=addyosmani",
    bio: "Engineering Manager at Google Chrome.",
    isFollowing: true,
  },
  {
    name: "Kent C. Dodds",
    username: "kentcdodds",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kentcdodds",
    bio: "Developer, Educator, and Open Source Maintainer.",
    isFollowing: true,
  },
];

export default async function FollowingPage({
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
            {username} is following
          </h1>
          <span className="rounded-full bg-surface-200 px-2.5 py-0.5 text-sm font-medium dark:bg-dark-300">
            {following.length}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {following.map((user) => (
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
                <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                  {user.bio}
                </p>
              </div>
              <Button
                variant={user.isFollowing ? "outline" : "default"}
                size="sm"
              >
                {user.isFollowing ? "Following" : "Follow"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
