export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row animate-pulse">
      {/* Main */}
      <div className="flex-1 space-y-4">
        <div className="flex gap-4 border-b border-dark-200 pb-3">
          <div className="h-4 w-16 rounded bg-dark-200" />
          <div className="h-4 w-16 rounded bg-dark-200" />
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex gap-3 border-b border-dark-200 py-4">
            <div className="h-8 w-8 shrink-0 rounded-full bg-dark-200" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-3/4 rounded bg-dark-200" />
              <div className="h-2 w-1/4 rounded bg-dark-200" />
            </div>
          </div>
        ))}
      </div>
      {/* Sidebar */}
      <div className="hidden w-[280px] shrink-0 space-y-6 lg:block">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 w-20 rounded bg-dark-200" />
            {Array.from({ length: 4 }).map((_, j) => (
              <div key={j} className="h-8 rounded bg-dark-200" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
