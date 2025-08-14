export type User = {
  id: string;
  username: string;
  avatarUrl?: string;
};

export type Comment = {
  id: string;
  text: string;
  author: User;
  createdAt: string;
  votes: number;
  replies?: Comment[];
};

export type Community = {
  id: string;
  slug: string;
  name: string;
  imageUrl?: string;
  description: string;
  createdAt: string;
  memberCount: number;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  author: User;
  community: {
    id: string;
    slug: string;
    name: string;
  };
  createdAt: string;
  votes: number;
  comments: Comment[];
};
