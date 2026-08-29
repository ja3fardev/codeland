"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronRight,
  Info,
  BookOpen,
  Lock,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const gitignoreTemplates = [
  "Node",
  "Python",
  "Go",
  "Rust",
  "Java",
  "Ruby",
  "PHP",
  "C#",
  "Swift",
  "Kotlin",
  "Dart",
  ".NET",
  "Unity",
  "Unreal Engine",
  "React",
  "Vue",
  "Angular",
  "Svelte",
  "Next.js",
  "Nuxt.js",
  "Laravel",
  "Django",
  "Rails",
];

const licenses = [
  { id: "mit", name: "MIT License", description: "Permits commercial use, modification, distribution, and private use." },
  { id: "apache-2.0", name: "Apache License 2.0", description: "Permits commercial use, modification, distribution, and private use with patent grant." },
  { id: "gpl-3.0", name: "GNU General Public License v3.0", description: "Permits commercial use, modification, distribution, but requires source code disclosure." },
  { id: "bsd-2", name: "BSD 2-Clause License", description: "Permits commercial use, modification, distribution, and private use with limited liability." },
  { id: "bsd-3", name: "BSD 3-Clause License", description: "Permits commercial use, modification, distribution, and private use with no endorsement." },
  { id: "mpl-2.0", name: "Mozilla Public License 2.0", description: "Permits commercial use, modification, distribution with file-level copyleft." },
  { id: "unlicense", name: "The Unlicense", description: "Releases work into the public domain with no restrictions." },
  { id: "none", name: "None", description: "No license selected." },
];

export default function NewRepoPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [initializeWithReadme, setInitializeWithReadme] = useState(false);
  const [gitignoreTemplate, setGitignoreTemplate] = useState("");
  const [license, setLicense] = useState("mit");
  const [showLicenseDropdown, setShowLicenseDropdown] = useState(false);

  const selectedLicense = licenses.find((l) => l.id === license);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link
          href="/"
          className="mb-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <h1 className="text-2xl font-bold">Create a new repository</h1>
        <p className="mt-2 text-muted-foreground">
          A repository contains all your project&apos;s files, including revision history.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Repository name */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Repository name <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="my-awesome-project"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Great repository names are short and memorable.
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="A brief description of your project"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <Separator />

            {/* Visibility */}
            <div className="space-y-4">
              <label className="text-sm font-medium">Visibility</label>

              <div className="flex flex-col gap-3">
                <label
                  className={`flex cursor-pointer items-start gap-4 rounded-lg border p-4 transition-colors ${
                    !isPrivate
                      ? "border-brand-500 bg-brand-50 dark:bg-brand-950"
                      : "border-border hover:border-brand-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="visibility"
                    checked={!isPrivate}
                    onChange={() => setIsPrivate(false)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <span className="font-medium">Public</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Anyone on the internet can see this repository.
                    </p>
                  </div>
                </label>

                <label
                  className={`flex cursor-pointer items-start gap-4 rounded-lg border p-4 transition-colors ${
                    isPrivate
                      ? "border-brand-500 bg-brand-50 dark:bg-brand-950"
                      : "border-border hover:border-brand-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="visibility"
                    checked={isPrivate}
                    onChange={() => setIsPrivate(true)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      <span className="font-medium">Private</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      You choose who can see and commit to this repository.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <Separator />

            {/* Initialize options */}
            <div className="space-y-4">
              <label className="text-sm font-medium">Initialize this repository with:</label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={initializeWithReadme}
                  onChange={(e) => setInitializeWithReadme(e.target.checked)}
                  className="h-4 w-4"
                />
                <div>
                  <span className="font-medium">Add a README file</span>
                  <p className="text-sm text-muted-foreground">
                    This is where you can write a long description for your project.
                  </p>
                </div>
              </label>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  .gitignore template
                </label>
                <select
                  value={gitignoreTemplate}
                  onChange={(e) => setGitignoreTemplate(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                >
                  <option value="">Choose .gitignore template</option>
                  {gitignoreTemplates.map((template) => (
                    <option key={template} value={template}>
                      {template}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  Choose a license
                </label>
                <select
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                >
                  {licenses.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name}
                    </option>
                  ))}
                </select>
                {selectedLicense && selectedLicense.id !== "none" && (
                  <p className="text-xs text-muted-foreground">
                    {selectedLicense.description}
                  </p>
                )}
              </div>
            </div>

            <Separator />

            {/* Create button */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {name ? (
                  <span>
                    <span className="font-medium">{isPrivate ? "🔒" : "🌐"}</span>{" "}
                    {isPrivate ? "Private" : "Public"} ·{" "}
                    <span className="font-medium">sarahchen</span>/
                    <span className="font-semibold text-brand-600">{name}</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Info className="h-4 w-4" />
                    Enter a repository name
                  </span>
                )}
              </div>
              <Button disabled={!name}>
                <BookOpen className="mr-2 h-4 w-4" />
                Create repository
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
