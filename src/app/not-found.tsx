import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-dark-0 px-4">
      <div className="text-center">
        <div className="mb-6 text-8xl font-bold text-dark-300">404</div>
        <h1 className="mb-2 text-2xl font-semibold text-dark-900">
          Page not found
        </h1>
        <p className="mb-8 max-w-md text-dark-500">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex h-10 items-center rounded-lg bg-green-600 px-6 text-sm font-semibold text-white hover:bg-green-700"
          >
            Go home
          </Link>
          <Link
            href="/explore"
            className="inline-flex h-10 items-center rounded-lg border border-dark-300 px-6 text-sm font-semibold text-dark-900 hover:bg-dark-100"
          >
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
}
