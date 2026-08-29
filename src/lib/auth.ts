import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Shared in-memory user store
const globalStore = globalThis as any;
if (!globalStore.__codeland_users) {
  globalStore.__codeland_users = new Map();
  const demoId = "demo-user-001";
  globalStore.__codeland_users.set("demo@codeland.dev", {
    id: demoId,
    name: "Demo User",
    username: "demo",
    email: "demo@codeland.dev",
    password: bcrypt.hashSync("demo123", 10),
    image: "https://avatars.githubusercontent.com/u/1?v=4",
    bio: "Just exploring CodeLand!",
    location: "San Francisco",
    createdAt: new Date("2024-01-01"),
  });
}
const users: Map<string, any> = globalStore.__codeland_users;

const providers: NextAuthOptions["providers"] = [
  CredentialsProvider({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        throw new Error("Email and password required");
      }

      const user = users.get(credentials.email);
      if (!user) {
        throw new Error("No account found with this email");
      }

      const isValid = await bcrypt.compare(credentials.password, user.password);
      if (!isValid) {
        throw new Error("Invalid password");
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
      };
    },
  }),
];

// Only add GitHub provider if env vars are configured
if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
  import("next-auth/providers/github").then(({ default: GitHubProvider }) => {
    providers.push(
      GitHubProvider({
        clientId: process.env.GITHUB_ID!,
        clientSecret: process.env.GITHUB_SECRET!,
      })
    );
  });
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers,
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as any).id = token.sub;
        for (const user of users.values()) {
          if (user.id === token.sub) {
            (session.user as any).username = user.username;
            session.user.name = user.name;
            session.user.image = user.image;
            break;
          }
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};
