export function Logo({ className = "", size = 32 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
    >
      <defs>
        <linearGradient id="codeland-logo-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1" />
          <stop offset="0.5" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="codeland-inner" x1="12" y1="12" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c4b5fd" />
          <stop offset="1" stopColor="#e0e7ff" />
        </linearGradient>
        <filter id="codeland-glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {/* Outer shield shape - like GitHub's octocat but a shield/code bracket */}
      <path
        d="M24 2L4 10V22C4 33.1 12.8 43.3 24 46C35.2 43.3 44 33.1 44 22V10L24 2Z"
        fill="url(#codeland-logo-grad)"
        filter="url(#codeland-glow)"
      />
      {/* Inner code bracket shape - the "< >" code symbol */}
      <path
        d="M18 16L12 24L18 32"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.95"
      />
      <path
        d="M30 16L36 24L30 32"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.95"
      />
      {/* Center slash - the code execution line */}
      <path
        d="M27 14L21 34"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Subtle inner highlight */}
      <path
        d="M24 4L6 11.5V22C6 32 14 41.5 24 44C34 41.5 42 32 42 22V11.5L24 4Z"
        fill="none"
        stroke="white"
        strokeWidth="0.5"
        opacity="0.2"
      />
    </svg>
  );
}

export function LogoFull({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Logo size={32} />
      <span className="text-lg font-bold tracking-tight">
        <span className="text-white">Code</span>
        <span className="text-violet-400">Land</span>
      </span>
    </div>
  );
}

export default Logo;
