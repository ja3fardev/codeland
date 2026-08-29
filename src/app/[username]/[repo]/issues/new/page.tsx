"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Tag, Eye, Edit3, Check } from "lucide-react";

const availableLabels = [
  { name: "bug", color: "bg-red-500" },
  { name: "enhancement", color: "bg-purple-500" },
  { name: "documentation", color: "bg-blue-500" },
  { name: "good first issue", color: "bg-green-500" },
  { name: "help wanted", color: "bg-yellow-500" },
  { name: "question", color: "bg-orange-500" },
  { name: "wontfix", color: "bg-gray-500" },
];

function LabelBadge({ label }: { label: string }) {
  const labelData = availableLabels.find((l) => l.name === label);
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-white ${labelData?.color || "bg-gray-500"}`}
    >
      {label}
    </span>
  );
}

export default function NewIssuePage({
  params,
}: {
  params: Promise<{ username: string; repo: string }>;
}) {
  const [username, setUsername] = useState("");
  const [repo, setRepo] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [showLabelSelector, setShowLabelSelector] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  params.then((p) => { setUsername(p.username); setRepo(p.repo); });

  const toggleLabel = (label: string) => {
    setSelectedLabels((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const handleSubmit = () => {
    if (!title.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      alert(`Issue created: ${title}`);
    }, 1000);
  };

  return (
    <div className="flex min-h-0 flex-1">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-border overflow-y-auto">
        <div className="sticky top-16 space-y-4 p-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold leading-tight">{repo || "repo"}</h2>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              A revolutionary developer platform
            </p>
          </div>

          <nav className="space-y-1">
            {[
              { label: "Code", href: `/${username || "user"}/${repo || "repo"}`, active: false },
              { label: "Issues", href: `/${username || "user"}/${repo || "repo"}/issues`, active: true },
              { label: "Pull Requests", href: `/${username || "user"}/${repo || "repo"}/pullrequests`, active: false },
              { label: "Settings", href: `/${username || "user"}/${repo || "repo"}/settings`, active: false },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  item.active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
            <Link href={`/${username || "user"}`} className="hover:text-brand-600 hover:underline">
              {username || "user"}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/${username || "user"}/${repo || "repo"}`} className="hover:text-brand-600 hover:underline">
              {repo || "repo"}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/${username || "user"}/${repo || "repo"}/issues`} className="hover:text-brand-600 hover:underline">
              Issues
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-semibold text-foreground">New Issue</span>
          </nav>

          {/* Tabs */}
          <nav className="flex items-center gap-1 border-b border-border overflow-x-auto">
            {[
              { label: "Code", active: false },
              { label: "Issues", active: true },
              { label: "Pull Requests", active: false },
              { label: "Actions", active: false },
            ].map((tab) => (
              <span
                key={tab.label}
                className={`flex items-center gap-1.5 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  tab.active
                    ? "border-brand-600 text-foreground"
                    : "border-transparent text-muted-foreground"
                }`}
              >
                {tab.label}
              </span>
            ))}
          </nav>

          <h1 className="mt-6 text-2xl font-bold">New Issue</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create a new issue to track bugs, feature requests, or tasks.
          </p>

          <div className="mt-6 space-y-4">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1.5">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Issue title"
                className="h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {/* Body */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="body" className="block text-sm font-medium text-foreground">
                  Description
                </label>
                <div className="flex items-center gap-1 rounded-md border border-border p-0.5">
                  <button
                    onClick={() => setPreviewMode(false)}
                    className={`flex items-center gap-1 rounded px-2 py-1 text-xs font-medium transition-colors ${
                      !previewMode
                        ? "bg-surface-200 text-foreground dark:bg-dark-300"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Edit3 className="h-3 w-3" />
                    Write
                  </button>
                  <button
                    onClick={() => setPreviewMode(true)}
                    className={`flex items-center gap-1 rounded px-2 py-1 text-xs font-medium transition-colors ${
                      previewMode
                        ? "bg-surface-200 text-foreground dark:bg-dark-300"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Eye className="h-3 w-3" />
                    Preview
                  </button>
                </div>
              </div>

              {previewMode ? (
                <div className="min-h-[200px] rounded-md border border-border bg-surface-50 p-4 dark:bg-dark-100">
                  {body ? (
                    <pre className="whitespace-pre-wrap font-sans text-sm text-foreground">
                      {body}
                    </pre>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      Nothing to preview
                    </p>
                  )}
                </div>
              ) : (
                <textarea
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Describe the issue in detail. You can use Markdown formatting."
                  rows={12}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 resize-y font-mono"
                />
              )}
            </div>

            {/* Labels */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Labels
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowLabelSelector(!showLabelSelector)}
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm hover:bg-surface-50 dark:hover:bg-dark-100 transition-colors"
                >
                  <Tag className="h-4 w-4" />
                  {selectedLabels.length > 0
                    ? `${selectedLabels.length} label(s) selected`
                    : "Select labels"}
                  <ChevronRight className={`h-3 w-3 transition-transform ${showLabelSelector ? "rotate-90" : ""}`} />
                </button>

                {showLabelSelector && (
                  <div className="absolute z-10 mt-1 w-72 rounded-md border border-border bg-background shadow-lg">
                    <div className="p-2">
                      <input
                        type="text"
                        placeholder="Filter labels..."
                        className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-brand-500"
                      />
                    </div>
                    <div className="max-h-60 overflow-y-auto p-1">
                      {availableLabels.map((label) => (
                        <button
                          key={label.name}
                          onClick={() => toggleLabel(label.name)}
                          className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-surface-50 dark:hover:bg-dark-100 transition-colors"
                        >
                          <div
                            className={`h-4 w-4 rounded ${selectedLabels.includes(label.name) ? label.color : "border border-border"}`}
                          >
                            {selectedLabels.includes(label.name) && (
                              <Check className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <LabelBadge label={label.name} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {selectedLabels.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {selectedLabels.map((label) => (
                    <button
                      key={label}
                      onClick={() => toggleLabel(label)}
                      className="group flex items-center gap-1"
                    >
                      <LabelBadge label={label} />
                      <span className="text-xs text-muted-foreground group-hover:text-red-500">×</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between border-t border-border pt-4">
              <p className="text-xs text-muted-foreground">
                Supports Markdown formatting
              </p>
              <button
                onClick={handleSubmit}
                disabled={!title.trim() || submitting}
                className="inline-flex items-center gap-1.5 rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Submitting...
                  </>
                ) : (
                  "Submit new issue"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
