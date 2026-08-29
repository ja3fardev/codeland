"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  AlertTriangle,
  Trash2,
  Globe,
  Lock,
  Save,
  Info,
} from "lucide-react";

export default function RepoSettingsPage({
  params,
}: {
  params: Promise<{ username: string; repo: string }>;
}) {
  const [username, setUsername] = useState("");
  const [repo, setRepo] = useState("");
  const [repoName, setRepoName] = useState("");
  const [description, setDescription] = useState(
    "A revolutionary developer platform for modern software engineering teams."
  );
  const [isPublic, setIsPublic] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [saving, setSaving] = useState(false);

  params.then((p) => {
    setUsername(p.username);
    setRepo(p.repo);
    if (!repoName) setRepoName(p.repo);
  });

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert("Settings saved successfully!");
    }, 1000);
  };

  const handleDelete = () => {
    if (deleteConfirmText !== repoName) return;
    alert(`Repository ${username}/${repoName} has been deleted.`);
    setShowDeleteConfirm(false);
    setDeleteConfirmText("");
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
              { label: "Issues", href: `/${username || "user"}/${repo || "repo"}/issues`, active: false },
              { label: "Pull Requests", href: `/${username || "user"}/${repo || "repo"}/pullrequests`, active: false },
              { label: "Actions", href: `/${username || "user"}/${repo || "repo"}/actions`, active: false },
              { label: "Settings", href: `/${username || "user"}/${repo || "repo"}/settings`, active: true },
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
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
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
            <span className="font-semibold text-foreground">Settings</span>
          </nav>

          {/* Tabs */}
          <nav className="flex items-center gap-1 border-b border-border overflow-x-auto">
            {[
              { label: "Code", active: false },
              { label: "Issues", active: false },
              { label: "Pull Requests", active: false },
              { label: "Settings", active: true },
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

          <h1 className="mt-6 text-2xl font-bold">Repository Settings</h1>

          <div className="mt-8 space-y-8">
            {/* General settings */}
            <section className="rounded-lg border border-border">
              <div className="border-b border-border px-6 py-4">
                <h2 className="text-lg font-semibold">General</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Manage your repository settings.
                </p>
              </div>

              <div className="space-y-6 px-6 py-6">
                {/* Repository name */}
                <div>
                  <label htmlFor="repo-name" className="block text-sm font-medium text-foreground">
                    Repository name
                  </label>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{username || "user"}/</span>
                    <input
                      id="repo-name"
                      type="text"
                      value={repoName}
                      onChange={(e) => setRepoName(e.target.value)}
                      className="h-10 flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Changing the repository name will affect the URL.
                  </p>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-foreground">
                    Description
                  </label>
                  <input
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add a description"
                    className="mt-1.5 h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                {/* Visibility */}
                <div>
                  <label className="block text-sm font-medium text-foreground">
                    Visibility
                  </label>
                  <div className="mt-1.5 space-y-2">
                    <button
                      onClick={() => setIsPublic(true)}
                      className={`flex w-full items-center gap-3 rounded-md border px-4 py-3 text-left transition-colors ${
                        isPublic
                          ? "border-brand-600 bg-brand-50 dark:bg-brand-950"
                          : "border-border hover:bg-surface-50 dark:hover:bg-dark-100"
                      }`}
                    >
                      <Globe className={`h-5 w-5 ${isPublic ? "text-brand-600" : "text-muted-foreground"}`} />
                      <div>
                        <p className="text-sm font-medium">Public</p>
                        <p className="text-xs text-muted-foreground">
                          Anyone on the internet can see this repository.
                        </p>
                      </div>
                      {isPublic && (
                        <div className="ml-auto h-4 w-4 rounded-full bg-brand-600 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-white" />
                        </div>
                      )}
                    </button>
                    <button
                      onClick={() => setIsPublic(false)}
                      className={`flex w-full items-center gap-3 rounded-md border px-4 py-3 text-left transition-colors ${
                        !isPublic
                          ? "border-brand-600 bg-brand-50 dark:bg-brand-950"
                          : "border-border hover:bg-surface-50 dark:hover:bg-dark-100"
                      }`}
                    >
                      <Lock className={`h-5 w-5 ${!isPublic ? "text-brand-600" : "text-muted-foreground"}`} />
                      <div>
                        <p className="text-sm font-medium">Private</p>
                        <p className="text-xs text-muted-foreground">
                          Only you and collaborators can see this repository.
                        </p>
                      </div>
                      {!isPublic && (
                        <div className="ml-auto h-4 w-4 rounded-full bg-brand-600 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-white" />
                        </div>
                      )}
                    </button>
                  </div>
                </div>

                {/* Save button */}
                <div className="flex justify-end border-t border-border pt-4">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center gap-1.5 rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
                  >
                    {saving ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    Save changes
                  </button>
                </div>
              </div>
            </section>

            {/* Danger zone */}
            <section className="rounded-lg border-2 border-red-200 dark:border-red-900">
              <div className="border-b border-red-200 dark:border-red-900 px-6 py-4">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  Danger Zone
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  These actions are destructive and cannot be undone.
                </p>
              </div>

              <div className="px-6 py-6">
                <div className="flex items-center justify-between rounded-md border border-red-200 dark:border-red-900 p-4">
                  <div>
                    <h3 className="text-sm font-medium text-foreground">Delete this repository</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Once you delete a repository, there is no going back. Please be certain.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="inline-flex items-center gap-1.5 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => {
              setShowDeleteConfirm(false);
              setDeleteConfirmText("");
            }}
          />
          <div className="relative z-10 w-full max-w-md rounded-lg border border-border bg-background p-6 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Delete repository</h3>
                <p className="text-sm text-muted-foreground">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm text-foreground">
              This will permanently delete the repository{" "}
              <strong>{username}/{repoName}</strong>, all its issues, pull requests, and associated data.
            </p>

            <div className="mt-4">
              <label htmlFor="delete-confirm" className="block text-sm font-medium text-foreground mb-1.5">
                Type <strong>{repoName}</strong> to confirm:
              </label>
              <input
                id="delete-confirm"
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder={repoName}
                className="h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteConfirmText("");
                }}
                className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-surface-50 dark:hover:bg-dark-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteConfirmText !== repoName}
                className="inline-flex items-center gap-1.5 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 className="h-4 w-4" />
                I understand, delete this repository
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
