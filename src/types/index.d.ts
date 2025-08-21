export type User = {
  id: string;
  username: string;
  displayName?: string;
  avatarUrl?: string;
  createdAt: string;
  karma: number;
  gender: string;
};

export type Comment = {
  id: string;
  text: string;
  author: User;
  createdAt: string;
  votes: number;
  replies?: Comment[];
};

export interface UserComment extends Comment {
  postTitle: string;
  postId: string;
  postAuthor: string;
}

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

export type NotificationType = 'NEW_COMMENT' | 'POST_UPVOTE' | 'NEW_FOLLOWER';

export type Notification = {
  id: string;
  type: NotificationType;
  actor: User;
  entityUrl: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export type SortType = "hot" | "new" | "top";

export type Activity = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}
