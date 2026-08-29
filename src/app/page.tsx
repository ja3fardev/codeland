import { Logo } from "@/components/layout/logo";
import {
  GitBranch,
  GitPullRequest,
  AlertCircle,
  Cpu,
  Sparkles,
  Users,
  ArrowRight,
  Star,
  GitFork,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: GitBranch,
    title: "Repositories",
    description:
      "Host and manage your code with powerful version control. Private and public repos with unlimited collaborators.",
  },
  {
    icon: GitPullRequest,
    title: "Code Review",
    description:
      "Collaborative code review with inline comments, approvals, and automated checks to maintain code quality.",
  },
  {
    icon: AlertCircle,
    title: "Issues & PRs",
    description:
      "Track bugs, manage tasks, and streamline your workflow with integrated issues and pull requests.",
  },
  {
    icon: Cpu,
    title: "Actions CI/CD",
    description:
      "Automate your build, test, and deployment pipeline with powerful continuous integration workflows.",
  },
  {
    icon: Sparkles,
    title: "AI Assistant",
    description:
      "Get intelligent code suggestions, automated reviews, and documentation powered by cutting-edge AI.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Connect with developers worldwide. Contribute to open-source, share knowledge, and grow together.",
  },
];

const stats = [
  { label: "Repositories", value: "100K+" },
  { label: "Developers", value: "50K+" },
  { label: "Pull Requests", value: "2M+" },
  { label: "Stars Given", value: "10M+" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/explore"
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              Explore
            </Link>
            <Link
              href="/trending"
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              Trending
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.15),transparent)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-800 bg-gray-900/50 px-4 py-1.5 text-sm text-gray-400 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            Powered by AI — Ship code faster
          </div>

          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
            <span className="bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
              Where developers
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              build
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 sm:text-xl">
            CodeLand is the premium developer platform for code hosting, review,
            and collaboration. Build better software with your team and the
            open-source community.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-500 hover:shadow-emerald-600/40"
            >
              Get started for free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-700 bg-gray-800/50 px-8 py-3.5 text-base font-semibold text-gray-300 backdrop-blur-sm transition-all hover:border-gray-600 hover:bg-gray-800 hover:text-white"
            >
              Explore open-source
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to ship
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              A complete platform for modern software development
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group relative rounded-2xl border border-gray-800/50 bg-gray-900/30 p-8 backdrop-blur-sm transition-all duration-300 hover:border-gray-700/50 hover:bg-gray-900/50"
                >
                  <div className="mb-5 inline-flex rounded-xl bg-emerald-500/10 p-3">
                    <Icon className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-gray-800/50 bg-gray-900/30 p-12 backdrop-blur-sm sm:p-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Trusted by developers worldwide
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Join a growing community of developers building the future
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-emerald-400">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Ready to start building?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-400">
            Join thousands of developers who trust CodeLand for their projects.
            Free for open-source.
          </p>
          <div className="mt-10">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-500"
            >
              Create your account
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4">
                <Logo />
              </div>
              <p className="text-sm text-gray-500">
                The premium developer
                <br />
                platform.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold text-white">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/explore"
                    className="text-sm text-gray-500 hover:text-gray-300"
                  >
                    Explore
                  </Link>
                </li>
                <li>
                  <Link
                    href="/trending"
                    className="text-sm text-gray-500 hover:text-gray-300"
                  >
                    Trending
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-gray-300">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-gray-300">
                    CI/CD
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold text-white">
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-gray-300">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-gray-300">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-gray-300">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-gray-300">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold text-white">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-gray-300">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-gray-300">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-gray-300">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-gray-300">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-800/50 pt-8 sm:flex-row">
            <p className="text-sm text-gray-500">
              &copy; 2026 CodeLand. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="text-sm text-gray-500 hover:text-gray-300"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-500 hover:text-gray-300"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-500 hover:text-gray-300"
              >
                Security
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
