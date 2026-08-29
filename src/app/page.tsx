import Link from "next/link";
import {
  GitBranch,
  GitPullRequest,
  Shield,
  Cpu,
  Sparkles,
  Users,
  ArrowRight,
  Star,
  Zap,
  Globe,
  Lock,
  Terminal,
  Code2,
} from "lucide-react";
import { Logo } from "@/components/layout/logo";

const features = [
  {
    icon: GitBranch,
    title: "Repositories",
    description:
      "Host and manage your code with powerful version control. Public and private repos with unlimited collaborators.",
  },
  {
    icon: GitPullRequest,
    title: "Code Review",
    description:
      "Review code changes with inline comments, approval workflows, and protected branches.",
  },
  {
    icon: Shield,
    title: "Issues & Projects",
    description:
      "Track bugs, feature requests, and manage your workflow with built-in project boards and milestones.",
  },
  {
    icon: Terminal,
    title: "Actions CI/CD",
    description:
      "Automate your workflow with powerful CI/CD pipelines. Build, test, and deploy with ease.",
  },
  {
    icon: Sparkles,
    title: "AI Assistant",
    description:
      "Samurai Agent helps you write, explain, debug, and refactor code with AI-powered intelligence.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Follow developers, discover trending projects, and collaborate with the global open-source community.",
  },
];

const languages = [
  { name: "TypeScript", color: "#3178c6" },
  { name: "Python", color: "#3572A5" },
  { name: "Rust", color: "#dea584" },
  { name: "Go", color: "#00ADD8" },
  { name: "Java", color: "#b07219" },
  { name: "C++", color: "#f34b7d" },
  { name: "Ruby", color: "#701516" },
  { name: "Swift", color: "#F05138" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-0">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-dark-0 to-dark-0" />
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-400">
              <Sparkles className="h-4 w-4" />
              AI-Powered Developer Platform
            </div>

            {/* Headline */}
            <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-7xl">
              Where developers
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                build the future
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mx-auto mt-6 max-w-2xl text-lg text-dark-500 sm:text-xl">
              CodeLand is the premium platform for developers to host code,
              review changes, ship software, and collaborate with the global
              community.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/register"
                className="group inline-flex h-12 items-center gap-2 rounded-lg bg-green-600 px-8 text-base font-semibold text-white shadow-lg shadow-green-600/25 transition-all hover:bg-green-500 hover:shadow-green-600/40"
              >
                Get started for free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/explore"
                className="inline-flex h-12 items-center gap-2 rounded-lg border border-dark-300 bg-dark-100 px-8 text-base font-semibold text-dark-900 transition-all hover:border-dark-400 hover:bg-dark-200"
              >
                Explore open-source
              </Link>
            </div>

            {/* Code preview box */}
            <div className="mx-auto mt-16 max-w-2xl overflow-hidden rounded-xl border border-dark-200 bg-dark-50 shadow-2xl">
              <div className="flex items-center gap-2 border-b border-dark-200 bg-dark-100 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-dark-500">
                  ~/my-project
                </span>
              </div>
              <div className="p-4 text-left font-mono text-sm">
                <div className="text-dark-500">
                  <span className="text-green-500">$</span> codeland init
                  --template nextjs
                </div>
                <div className="mt-2 text-violet-400">
                  <span className="text-dark-500">&#123;</span>
                </div>
                <div className="ml-4 text-dark-600">
                  <span className="text-violet-400">&quot;name&quot;</span>:{" "}
                  <span className="text-green-400">&quot;my-project&quot;</span>,
                </div>
                <div className="ml-4 text-dark-600">
                  <span className="text-violet-400">&quot;framework&quot;</span>:{" "}
                  <span className="text-green-400">&quot;nextjs&quot;</span>,
                </div>
                <div className="ml-4 text-dark-600">
                  <span className="text-violet-400">&quot;ai&quot;</span>:{" "}
                  <span className="text-yellow-400">true</span>
                </div>
                <div className="text-dark-500">
                  <span className="text-dark-400">&#125;</span>
                </div>
                <div className="mt-2 text-green-500">
                  &quot;Project created successfully! Ready to deploy.&quot;
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by section */}
      <section className="border-y border-dark-200 bg-dark-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100K+</div>
              <div className="mt-1 text-sm text-dark-500">
                Active Developers
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">2M+</div>
              <div className="mt-1 text-sm text-dark-500">Repositories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">500M+</div>
              <div className="mt-1 text-sm text-dark-500">
                Lines of Code Hosted
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">99.9%</div>
              <div className="mt-1 text-sm text-dark-500">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Everything you need to ship
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-dark-500">
              From code hosting to AI-powered development, CodeLand has every
              tool modern developers need.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group rounded-xl border border-dark-200 bg-dark-50 p-6 transition-all hover:border-violet-500/50 hover:bg-dark-100"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400 transition-colors group-hover:bg-violet-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-dark-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Languages */}
      <section className="border-y border-dark-200 bg-dark-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">
              Built for every language
            </h2>
            <p className="mt-3 text-dark-500">
              Syntax highlighting and tooling for 100+ programming languages.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {languages.map((lang) => (
              <div
                key={lang.name}
                className="flex items-center gap-2 rounded-lg border border-dark-200 bg-dark-0 px-4 py-2.5"
              >
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: lang.color }}
                />
                <span className="text-sm font-medium text-dark-700">
                  {lang.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-dark-200 bg-dark-50 p-12">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to build something legendary?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-dark-500">
              Join 100,000+ developers who are building the future on CodeLand.
              Start for free, scale when you grow.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex h-12 items-center gap-2 rounded-lg bg-green-600 px-8 text-base font-semibold text-white shadow-lg shadow-green-600/25 transition-all hover:bg-green-500"
              >
                Start building for free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/explore"
                className="inline-flex h-12 items-center gap-2 rounded-lg border border-dark-300 px-8 text-base font-semibold text-dark-900 transition-all hover:bg-dark-100"
              >
                <Globe className="h-4 w-4" />
                View demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-200 bg-dark-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-5">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5">
                <Logo size={28} />
                <span className="text-lg font-bold">
                  <span className="text-dark-900">Code</span>
                  <span className="text-violet-400">Land</span>
                </span>
              </div>
              <p className="mt-3 max-w-xs text-sm text-dark-500">
                The legendary developer platform. Build, share, and discover
                amazing software.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-dark-900">Product</h3>
              <ul className="mt-3 space-y-2 text-sm text-dark-500">
                <li><Link href="/explore" className="hover:text-dark-700 hover:underline">Explore</Link></li>
                <li><Link href="/trending" className="hover:text-dark-700 hover:underline">Trending</Link></li>
                <li><Link href="/register" className="hover:text-dark-700 hover:underline">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-dark-900">Resources</h3>
              <ul className="mt-3 space-y-2 text-sm text-dark-500">
                <li><Link href="/docs" className="hover:text-dark-700 hover:underline">Documentation</Link></li>
                <li><Link href="/api" className="hover:text-dark-700 hover:underline">API Reference</Link></li>
                <li><Link href="/status" className="hover:text-dark-700 hover:underline">Status</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-dark-900">Company</h3>
              <ul className="mt-3 space-y-2 text-sm text-dark-500">
                <li><Link href="/about" className="hover:text-dark-700 hover:underline">About</Link></li>
                <li><Link href="/blog" className="hover:text-dark-700 hover:underline">Blog</Link></li>
                <li><Link href="/terms" className="hover:text-dark-700 hover:underline">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-dark-700 hover:underline">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 flex items-center justify-between border-t border-dark-200 pt-8 text-sm text-dark-500">
            <p>&copy; 2024 CodeLand. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-dark-700">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
