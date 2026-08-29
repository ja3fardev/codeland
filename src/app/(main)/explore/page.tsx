"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Star, GitFork, Code } from "lucide-react";

const languages = [
  "All",
  "TypeScript",
  "JavaScript",
  "Python",
  "Go",
  "Rust",
  "Java",
  "C++",
];

const topics = [
  "All",
  "machine-learning",
  "web",
  "cli",
  "api",
  "database",
  "devops",
  "security",
];

const mockRepos = [
  {
    id: 1,
    name: "codeland-engine",
    fullName: "codeland/codeland-engine",
    description:
      "High-performance code analysis engine with AI-powered suggestions and real-time collaboration",
    language: "TypeScript",
    languageColor: "#3178C6",
    stars: 12847,
    forks: 2341,
    topic: "web",
  },
  {
    id: 2,
    name: "neural-formatter",
    fullName: "sarah-chen/neural-formatter",
    description:
      "ML-powered code formatter that learns your style preferences and applies them consistently",
    language: "Python",
    languageColor: "#3572A5",
    stars: 8932,
    forks: 1123,
    topic: "machine-learning",
  },
  {
    id: 3,
    name: "go-cli-framework",
    fullName: "devtools/go-cli-framework",
    description:
      "Lightweight and extensible CLI framework for building beautiful command-line tools in Go",
    language: "Go",
    languageColor: "#00ADD8",
    stars: 6234,
    forks: 892,
    topic: "cli",
  },
  {
    id: 4,
    name: "rust-web-server",
    fullName: "systech/rust-web-server",
    description:
      "Blazing fast web server with built-in load balancing, SSL, and WebSocket support",
    language: "Rust",
    languageColor: "#DEA584",
    stars: 15623,
    forks: 3201,
    topic: "web",
  },
  {
    id: 5,
    name: "react-dashboard",
    fullName: "frontend-studio/react-dashboard",
    description:
      "Modern admin dashboard template with 50+ customizable components and dark mode",
    language: "TypeScript",
    languageColor: "#3178C6",
    stars: 21456,
    forks: 4521,
    topic: "web",
  },
  {
    id: 6,
    name: "api-gateway",
    fullName: "cloudnative/api-gateway",
    description:
      "Cloud-native API gateway with rate limiting, authentication, and request transformation",
    language: "Go",
    languageColor: "#00ADD8",
    stars: 9871,
    forks: 1543,
    topic: "api",
  },
  {
    id: 7,
    name: "postgres-optimizer",
    fullName: "dbtools/postgres-optimizer",
    description:
      "Automated PostgreSQL query optimizer and index recommendation engine",
    language: "Python",
    languageColor: "#3572A5",
    stars: 5634,
    forks: 723,
    topic: "database",
  },
  {
    id: 8,
    name: "k8s-deployer",
    fullName: "devops-hub/k8s-deployer",
    description:
      "Zero-downtime Kubernetes deployment tool with canary releases and rollback support",
    language: "Go",
    languageColor: "#00ADD8",
    stars: 7823,
    forks: 1102,
    topic: "devops",
  },
  {
    id: 9,
    name: "security-scanner",
    fullName: "securecode/security-scanner",
    description:
      "Static analysis security scanner for detecting vulnerabilities in source code",
    language: "Rust",
    languageColor: "#DEA584",
    stars: 11234,
    forks: 2103,
    topic: "security",
  },
  {
    id: 10,
    name: "ml-pipeline",
    fullName: "aiml/ml-pipeline",
    description:
      "End-to-end machine learning pipeline framework for training, evaluation, and deployment",
    language: "Python",
    languageColor: "#3572A5",
    stars: 18923,
    forks: 3456,
    topic: "machine-learning",
  },
  {
    id: 11,
    name: "electron-app",
    fullName: "desktop-dev/electron-app",
    description:
      "Cross-platform desktop app boilerplate with auto-updater, notifications, and native menus",
    language: "TypeScript",
    languageColor: "#3178C6",
    stars: 4532,
    forks: 892,
    topic: "web",
  },
  {
    id: 12,
    name: "java-spring-starter",
    fullName: "enterprise/java-spring-starter",
    description:
      "Production-ready Spring Boot starter with authentication, caching, and monitoring",
    language: "Java",
    languageColor: "#B07219",
    stars: 6723,
    forks: 1345,
    topic: "api",
  },
];

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toString();
}

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"languages" | "topics">(
    "languages"
  );
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState("All");

  const filteredRepos = mockRepos.filter((repo) => {
    const matchesSearch =
      !searchQuery ||
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLanguage =
      selectedLanguage === "All" || repo.language === selectedLanguage;
    const matchesTopic =
      selectedTopic === "All" || repo.topic === selectedTopic;

    return matchesSearch && matchesLanguage && matchesTopic;
  });

  return (
    <div className="min-h-screen bg-gray-950 pt-20">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Explore</h1>
          <p className="mt-2 text-gray-400">
            Discover open-source projects and repositories
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-800 bg-gray-900/50 py-3 pl-12 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50"
              placeholder="Search repositories..."
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex gap-4 border-b border-gray-800">
          <button
            onClick={() => setActiveTab("languages")}
            className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === "languages"
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-gray-400 hover:text-gray-300"
            }`}
          >
            Languages
          </button>
          <button
            onClick={() => setActiveTab("topics")}
            className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === "topics"
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-gray-400 hover:text-gray-300"
            }`}
          >
            Topics
          </button>
        </div>

        {/* Filter Chips */}
        <div className="mb-8 flex flex-wrap gap-2">
          {activeTab === "languages"
            ? languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    selectedLanguage === lang
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-gray-300"
                  }`}
                >
                  {lang}
                </button>
              ))
            : topics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    selectedTopic === topic
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-gray-300"
                  }`}
                >
                  {topic}
                </button>
              ))}
        </div>

        {/* Repository Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredRepos.map((repo) => (
            <Link
              key={repo.id}
              href={`/${repo.fullName}`}
              className="group rounded-xl border border-gray-800/50 bg-gray-900/30 p-6 transition-all duration-200 hover:border-gray-700/50 hover:bg-gray-900/50"
            >
              <div className="mb-3 flex items-start justify-between">
                <h3 className="font-semibold text-white group-hover:text-emerald-400">
                  {repo.name}
                </h3>
              </div>
              <p className="mb-4 line-clamp-2 text-sm text-gray-400">
                {repo.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: repo.languageColor }}
                  />
                  {repo.language}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5" />
                  {formatNumber(repo.stars)}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="h-3.5 w-3.5" />
                  {formatNumber(repo.forks)}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filteredRepos.length === 0 && (
          <div className="py-20 text-center">
            <Code className="mx-auto h-12 w-12 text-gray-700" />
            <p className="mt-4 text-gray-400">No repositories found</p>
            <p className="mt-1 text-sm text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
