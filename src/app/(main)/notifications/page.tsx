"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Star,
  GitFork,
  GitPullRequest,
  AlertCircle,
  CheckCircle,
  MessageSquare,
  AtSign,
  UserPlus,
  Package,
  Settings,
  Filter,
  CheckCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type Notification = {
  id: number;
  type: "star" | "fork" | "pr" | "issue" | "comment" | "mention" | "follow" | "release" | "security";
  message: string;
  repo?: string;
  time: string;
  isRead: boolean;
};

const notifications: Notification[] = [
  {
    id: 1,
    type: "star",
    message: "mikej starred your repository",
    repo: "vercel/next.js",
    time: "5 minutes ago",
    isRead: false,
  },
  {
    id: 2,
    type: "pr",
    message: "New pull request: Fix hydration mismatch",
    repo: "vercel/next.js",
    time: "30 minutes ago",
    isRead: false,
  },
  {
    id: 3,
    type: "issue",
    message: "New issue: Memory leak in useEffect",
    repo: "facebook/react",
    time: "1 hour ago",
    isRead: false,
  },
  {
    id: 4,
    type: "comment",
    message: "emilyz commented on your pull request",
    repo: "vuejs/core",
    time: "2 hours ago",
    isRead: true,
  },
  {
    id: 5,
    type: "mention",
    message: "You were mentioned in a discussion",
    repo: "sveltejs/svelte",
    time: "3 hours ago",
    isRead: true,
  },
  {
    id: 6,
    type: "fork",
    message: "alexr forked your repository",
    repo: "codeland/cli-tools",
    time: "5 hours ago",
    isRead: true,
  },
  {
    id: 7,
    type: "follow",
    message: "taylors started following you",
    time: "6 hours ago",
    isRead: true,
  },
  {
    id: 8,
    type: "release",
    message: "New release: v2.1.0",
    repo: "vercel/next.js",
    time: "1 day ago",
    isRead: true,
  },
  {
    id: 9,
    type: "security",
    message: "Security vulnerability detected in dependencies",
    repo: "facebook/react",
    time: "1 day ago",
    isRead: true,
  },
  {
    id: 10,
    type: "star",
    message: "jordanl starred your repository",
    repo: "codeland/ui-kit",
    time: "2 days ago",
    isRead: true,
  },
];

function NotificationIcon({ type }: { type: Notification["type"] }) {
  const iconClass = "h-5 w-5";
  switch (type) {
    case "star":
      return <Star className={`${iconClass} text-yellow-500`} />;
    case "fork":
      return <GitFork className={`${iconClass} text-blue-500`} />;
    case "pr":
      return <GitPullRequest className={`${iconClass} text-green-500`} />;
    case "issue":
      return <AlertCircle className={`${iconClass} text-orange-500`} />;
    case "comment":
      return <MessageSquare className={`${iconClass} text-purple-500`} />;
    case "mention":
      return <AtSign className={`${iconClass} text-cyan-500`} />;
    case "follow":
      return <UserPlus className={`${iconClass} text-pink-500`} />;
    case "release":
      return <Package className={`${iconClass} text-indigo-500`} />;
    case "security":
      return <AlertCircle className={`${iconClass} text-red-500`} />;
    default:
      return <Bell className={`${iconClass} text-muted-foreground`} />;
  }
}

export default function NotificationsPage() {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [items, setItems] = useState(notifications);

  const filteredItems =
    filter === "unread" ? items.filter((n) => !n.isRead) : items;

  const unreadCount = items.filter((n) => !n.isRead).length;

  const toggleRead = (id: number) => {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <Badge variant="secondary">{unreadCount} unread</Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={markAllRead}>
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "unread" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("unread")}
        >
          Unread
          {unreadCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <CheckCircle className="h-12 w-12 text-green-500" />
              <h3 className="mt-4 text-lg font-semibold">All caught up!</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                No unread notifications.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredItems.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 transition-colors ${
                    notification.isRead
                      ? "bg-background"
                      : "bg-brand-50/50 dark:bg-brand-950/30"
                  } hover:bg-surface-50 dark:hover:bg-dark-100`}
                >
                  <div className="mt-0.5">
                    <NotificationIcon type={notification.type} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm ${
                        notification.isRead
                          ? "text-muted-foreground"
                          : "font-medium"
                      }`}
                    >
                      {notification.message}
                    </p>
                    {notification.repo && (
                      <Link
                        href={`/${notification.repo}`}
                        className="mt-1 inline-block text-xs text-brand-600 hover:underline dark:text-brand-400"
                      >
                        {notification.repo}
                      </Link>
                    )}
                    <p className="mt-1 text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleRead(notification.id)}
                  >
                    {notification.isRead ? (
                      <Bell className="h-4 w-4" />
                    ) : (
                      <CheckCircle className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
