"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(form.username)) {
      setError("Username can only contain letters, numbers, - and _");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      // Auto sign in after registration
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (result?.error) {
        router.push("/login");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-dark-0 px-4">
      <div className="w-full max-w-[340px]">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Link href="/" className="transition-opacity hover:opacity-80">
            <Logo size={48} />
          </Link>
        </div>

        {/* Sign up box */}
        <div className="rounded-lg border border-dark-200 bg-dark-50 p-6 shadow-sm">
          <h1 className="mb-4 text-center text-xl font-semibold text-dark-900">
            Create your account
          </h1>

          {error && (
            <div className="mb-4 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="text"
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="h-10 border-dark-300 bg-white text-dark-900 placeholder:text-dark-500"
            />
            <Input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
              className="h-10 border-dark-300 bg-white text-dark-900 placeholder:text-dark-500"
            />
            <Input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="h-10 border-dark-300 bg-white text-dark-900 placeholder:text-dark-500"
            />
            <Input
              type="password"
              placeholder="Password (min 6 characters)"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="h-10 border-dark-300 bg-white text-dark-900 placeholder:text-dark-500"
            />
            <Input
              type="password"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              required
              className="h-10 border-dark-300 bg-white text-dark-900 placeholder:text-dark-500"
            />
            <Button
              type="submit"
              disabled={loading}
              className="h-10 w-full bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-dark-200" />
            <span className="text-xs text-dark-500">or</span>
            <div className="h-px flex-1 bg-dark-200" />
          </div>

          <Button
            onClick={() => signIn("github", { callbackUrl: "/" })}
            variant="outline"
            className="h-10 w-full border-dark-300 bg-white text-dark-900 hover:bg-dark-100"
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Continue with GitHub
          </Button>
        </div>

        {/* Sign in link */}
        <p className="mt-4 text-center text-sm text-dark-500">
          Already have an account?{" "}
          <Link href="/login" className="text-violet-500 hover:text-violet-600 hover:underline">
            Sign in
          </Link>
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-dark-500">
          <Link href="/terms" className="hover:text-dark-700 hover:underline">Terms</Link>
          <Link href="/privacy" className="hover:text-dark-700 hover:underline">Privacy</Link>
          <Link href="/docs" className="hover:text-dark-700 hover:underline">Docs</Link>
        </div>
      </div>
    </div>
  );
}
