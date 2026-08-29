import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(39)
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Username can only contain letters, numbers, hyphens, and underscores"
    ),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Global in-memory user store (persists across hot reloads in dev)
const globalStore = globalThis as any;
if (!globalStore.__codeland_users) {
  globalStore.__codeland_users = new Map();
  // Seed demo user
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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = registerSchema.safeParse(body);
    if (!result.success) {
      const firstError = result.error.errors[0];
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      );
    }

    const { name, username, email, password } = result.data;

    // Check if email already exists
    if (users.has(email)) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 }
      );
    }

    // Check if username already exists
    for (const user of users.values()) {
      if (user.username === username) {
        return NextResponse.json(
          { error: "Username already taken" },
          { status: 409 }
        );
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const newUser = {
      id,
      name,
      username,
      email,
      password: hashedPassword,
      image: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff`,
      bio: "",
      location: "",
      createdAt: new Date(),
    };

    users.set(email, newUser);

    return NextResponse.json(
      {
        message: "Account created successfully",
        user: {
          id: newUser.id,
          name: newUser.name,
          username: newUser.username,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
