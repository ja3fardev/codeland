# CodeLand

The legendary developer platform. A modern, open-source GitHub alternative built with Next.js 14.

## Features

- **Repositories** - Create, fork, star, watch repos with HTTPS/SSH clone
- **Code Viewer** - Syntax-highlighted code with line numbers, blame, history
- **Issues & PRs** - Full issue tracking with labels, milestones, and pull request diffs
- **User Profiles** - Contribution graphs, pinned repos, follower system
- **AI Assistant** - Samurai Agent for code explanation, debugging, and refactoring
- **Search** - Global search across repos, code, issues, and users
- **Dark Mode** - System-aware theme with manual toggle
- **SEO Optimized** - Dynamic Open Graph images and metadata

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI:** shadcn/ui + Radix primitives
- **Auth:** NextAuth.js
- **Database:** Prisma + PostgreSQL
- **State:** Zustand + TanStack Query
- **Animation:** Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Setup

```bash
# Clone the repository
git clone https://github.com/ja3fardev/codeland.git
cd codeland

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL and auth secrets

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Start development server
npm run dev
```

### Environment Variables

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
GITHUB_ID="your-github-oauth-id"
GITHUB_SECRET="your-github-oauth-secret"
```

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ja3fardev/codeland)

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── api/          # API routes
│   ├── (main)/       # Main layout pages
│   └── [username]/   # User & repo pages
├── components/       # React components
│   ├── ui/           # shadcn/ui components
│   ├── layout/       # Layout components
│   └── ai/           # AI assistant
├── lib/              # Utilities, auth, database
├── types/            # TypeScript types
└── hooks/            # Custom React hooks
```

## License

MIT
