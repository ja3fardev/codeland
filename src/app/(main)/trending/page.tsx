"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, ArrowUpRight, TrendingUp } from "lucide-react";

type TimeFrame = "today" | "week" | "month";

const trendingData: Record<TimeFrame, Array<{
  rank: number;
  name: string;
  fullName: string;
  description: string;
  language: string;
  languageColor: string;
  starsToday: number;
  totalStars: number;
}>> = {
  today: [
    {
      rank: 1,
      name: "codeland-engine",
      fullName: "codeland/codeland-engine",
      description: "High-performance code analysis engine with AI-powered suggestions",
      language: "TypeScript",
      languageColor: "#3178C6",
      starsToday: 847,
      totalStars: 12847,
    },
    {
      rank: 2,
      name: "rust-web-server",
      fullName: "systech/rust-web-server",
      description: "Blazing fast web server with built-in load balancing and WebSocket support",
      language: "Rust",
      languageColor: "#DEA584",
      starsToday: 623,
      totalStars: 15623,
    },
    {
      rank: 3,
      name: "ml-pipeline",
      fullName: "aiml/ml-pipeline",
      description: "End-to-end machine learning pipeline framework for training and deployment",
      language: "Python",
      languageColor: "#3572A5",
      starsToday: 512,
      totalStars: 18923,
    },
    {
      rank: 4,
      name: "go-cli-framework",
      fullName: "devtools/go-cli-framework",
      description: "Lightweight CLI framework for building command-line tools in Go",
      language: "Go",
      languageColor: "#00ADD8",
      starsToday: 431,
      totalStars: 6234,
    },
    {
      rank: 5,
      name: "neural-formatter",
      fullName: "sarah-chen/neural-formatter",
      description: "ML-powered code formatter that learns your style preferences",
      language: "Python",
      languageColor: "#3572A5",
      starsToday: 398,
      totalStars: 8932,
    },
    {
      rank: 6,
      name: "react-dashboard",
      fullName: "frontend-studio/react-dashboard",
      description: "Modern admin dashboard template with 50+ customizable components",
      language: "TypeScript",
      languageColor: "#3178C6",
      starsToday: 356,
      totalStars: 21456,
    },
    {
      rank: 7,
      name: "security-scanner",
      fullName: "securecode/security-scanner",
      description: "Static analysis security scanner for detecting vulnerabilities",
      language: "Rust",
      languageColor: "#DEA584",
      starsToday: 312,
      totalStars: 11234,
    },
    {
      rank: 8,
      name: "k8s-deployer",
      fullName: "devops-hub/k8s-deployer",
      description: "Zero-downtime Kubernetes deployment tool with canary releases",
      language: "Go",
      languageColor: "#00ADD8",
      starsToday: 287,
      totalStars: 7823,
    },
  ],
  week: [
    {
      rank: 1,
      name: "ml-pipeline",
      fullName: "aiml/ml-pipeline",
      description: "End-to-end machine learning pipeline framework for training and deployment",
      language: "Python",
      languageColor: "#3572A5",
      starsToday: 3247,
      totalStars: 18923,
    },
    {
      rank: 2,
      name: "react-dashboard",
      fullName: "frontend-studio/react-dashboard",
      description: "Modern admin dashboard template with 50+ customizable components",
      language: "TypeScript",
      languageColor: "#3178C6",
      starsToday: 2891,
      totalStars: 21456,
    },
    {
      rank: 3,
      name: "codeland-engine",
      fullName: "codeland/codeland-engine",
      description: "High-performance code analysis engine with AI-powered suggestions",
      language: "TypeScript",
      languageColor: "#3178C6",
      starsToday: 2456,
      totalStars: 12847,
    },
    {
      rank: 4,
      name: "rust-web-server",
      fullName: "systech/rust-web-server",
      description: "Blazing fast web server with built-in load balancing and WebSocket support",
      language: "Rust",
      languageColor: "#DEA584",
      starsToday: 2123,
      totalStars: 15623,
    },
    {
      rank: 5,
      name: "api-gateway",
      fullName: "cloudnative/api-gateway",
      description: "Cloud-native API gateway with rate limiting and authentication",
      language: "Go",
      languageColor: "#00ADD8",
      starsToday: 1876,
      totalStars: 9871,
    },
    {
      rank: 6,
      name: "security-scanner",
      fullName: "securecode/security-scanner",
      description: "Static analysis security scanner for detecting vulnerabilities",
      language: "Rust",
      languageColor: "#DEA584",
      starsToday: 1654,
      totalStars: 11234,
    },
    {
      rank: 7,
      name: "java-spring-starter",
      fullName: "enterprise/java-spring-starter",
      description: "Production-ready Spring Boot starter with authentication and monitoring",
      language: "Java",
      languageColor: "#B07219",
      starsToday: 1432,
      totalStars: 6723,
    },
    {
      rank: 8,
      name: "postgres-optimizer",
      fullName: "dbtools/postgres-optimizer",
      description: "Automated PostgreSQL query optimizer and index recommendation engine",
      language: "Python",
      languageColor: "#3572A5",
      starsToday: 1298,
      totalStars: 5634,
    },
  ],
  month: [
    {
      rank: 1,
      name: "react-dashboard",
      fullName: "frontend-studio/react-dashboard",
      description: "Modern admin dashboard template with 50+ customizable components",
      language: "TypeScript",
      languageColor: "#3178C6",
      starsToday: 12453,
      totalStars: 21456,
    },
    {
      rank: 2,
      name: "ml-pipeline",
      fullName: "aiml/ml-pipeline",
      description: "End-to-end machine learning pipeline framework for training and deployment",
      language: "Python",
      languageColor: "#3572A5",
      starsToday: 9876,
      totalStars: 18923,
    },
    {
      rank: 3,
      name: "rust-web-server",
      fullName: "systech/rust-web-server",
      description: "Blazing fast web server with built-in load balancing and WebSocket support",
      language: "Rust",
      languageColor: "#DEA584",
      starsToday: 8234,
      totalStars: 15623,
    },
    {
      rank: 4,
      name: "codeland-engine",
      fullName: "codeland/codeland-engine",
      description: "High-performance code analysis engine with AI-powered suggestions",
      language: "TypeScript",
      languageColor: "#3178C6",
      starsToday: 7654,
      totalStars: 12847,
    },
    {
      rank: 5,
      name: "security-scanner",
      fullName: "securecode/security-scanner",
      description: "Static analysis security scanner for detecting vulnerabilities",
      language: "Rust",
      languageColor: "#DEA584",
      starsToday: 6543,
      totalStars: 11234,
    },
    {
      rank: 6,
      name: "neural-formatter",
      fullName: "sarah-chen/neural-formatter",
      description: "ML-powered code formatter that learns your style preferences",
      language: "Python",
      languageColor: "#3572A5",
      starsToday: 5432,
      totalStars: 8932,
    },
    {
      rank: 7,
      name: "api-gateway",
      fullName: "cloudnative/api-gateway",
      description: "Cloud-native API gateway with rate limiting and authentication",
      language: "Go",
      languageColor: "#00ADD8",
      starsToday: 4987,
      totalStars: 9871,
    },
    {
      rank: 8,
      name: "go-cli-framework",
      fullName: "devtools/go-cli-framework",
      description: "Lightweight CLI framework for building command-line tools in Go",
      language: "Go",
      languageColor: "#00ADD8",
      starsToday: 4321,
      totalStars: 6234,
    },
  ],
};

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toString();
}

export default function TrendingPage() {
  const [activeTimeFrame, setActiveTimeFrame] = useState<TimeFrame>("today");

  const repos = trendingData[activeTimeFrame];

  return (
    <div className="min-h-screen bg-gray-950 pt-20">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <TrendingUp className="h-8 w-8 text-emerald-400" />
          <div>
            <h1 className="text-3xl font-bold text-white">Trending</h1>
            <p className="mt-1 text-gray-400">
              See what the developer community is excited about
            </p>
          </div>
        </div>

        {/* Time Frame Tabs */}
        <div className="mb-8 flex gap-1 rounded-xl border border-gray-800 bg-gray-900/50 p-1">
          {[
            { key: "today" as TimeFrame, label: "Today" },
            { key: "week" as TimeFrame, label: "This Week" },
            { key: "month" as TimeFrame, label: "This Month" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTimeFrame(tab.key)}
              className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                activeTimeFrame === tab.key
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Repository List */}
        <div className="space-y-3">
          {repos.map((repo) => (
            <Link
              key={repo.rank}
              href={`/${repo.fullName}`}
              className="group flex items-start gap-4 rounded-xl border border-gray-800/50 bg-gray-900/30 p-5 transition-all duration-200 hover:border-gray-700/50 hover:bg-gray-900/50"
            >
              {/* Rank */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-800/50 text-lg font-bold text-gray-500">
                {repo.rank}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-semibold text-white group-hover:text-emerald-400">
                    {repo.fullName}
                  </h3>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-gray-600 transition-colors group-hover:text-emerald-400" />
                </div>
                <p className="mt-1 line-clamp-1 text-sm text-gray-400">
                  {repo.description}
                </p>
                <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: repo.languageColor }}
                    />
                    {repo.language}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5" />
                    {formatNumber(repo.totalStars)}
                  </span>
                  <span className="text-emerald-400">
                    +{formatNumber(repo.starsToday)} today
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
