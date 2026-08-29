export interface RepoWithUser {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isPublic: boolean;
  language: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string | null;
    username: string | null;
    image: string | null;
  };
  _count?: {
    stars: number;
    forks: number;
    issues: number;
  };
}

export interface FileItem {
  name: string;
  path: string;
  type: "file" | "directory";
  size?: number;
  language?: string;
}

export interface SearchResult {
  repos: RepoWithUser[];
  users: {
    id: string;
    name: string | null;
    username: string | null;
    image: string | null;
    bio: string | null;
  }[];
}
