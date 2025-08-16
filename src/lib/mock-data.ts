import {
  Post,
  User,
  Community,
  UserComment,
  Activity
} from "@/types";

// Mock Users
const user1: User = {
  id: 'u1',
  username: 'john_doe',
  avatarUrl: 'https://i.pravatar.cc/150?u=u1',
  createdAt: '2023-05-10T12:00:00Z',
  karma: 1250
};
const user2: User = {
  id: 'u2',
  username: 'jane_smith',
  avatarUrl: 'https://i.pravatar.cc/150?u=u2',
  createdAt: '2023-08-01T09:00:00Z',
  karma: 850
};
const user3: User = {
  id: 'u3',
  username: 'dev_guru',
  avatarUrl: 'https://i.pravatar.cc/150?u=u3',
  createdAt: '2022-11-20T15:30:00Z',
  karma: 3400
};

// Mock Communities
export const mockCommunities: Community[] = [
  {
    id: 'comm1',
    slug: 'nextjs',
    name: 'Next.js Developers',
    imageUrl: 'https://i.pravatar.cc/150?u=comm1',
    description: 'A community for developers passionate about the Next.js framework, Vercel, and the future of the web.',
    createdAt: '2023-01-15T10:00:00Z',
    memberCount: 15432
  },
  {
    id: 'comm2',
    slug: 'react',
    name: 'React Community',
    imageUrl: 'https://i.pravatar.cc/150?u=comm2',
    description: 'Discuss all things React: hooks, components, state management, and the ecosystem.',
    createdAt: '2022-08-20T14:30:00Z',
    memberCount: 120543
  },
  {
    id: 'comm3',
    slug: 'webdev',
    name: 'Web Development',
    imageUrl: 'https://i.pravatar.cc/150?u=comm3',
    description: 'The central hub for news, articles, and discussions about modern web development.',
    createdAt: '2021-05-01T18:00:00Z',
    memberCount: 250100
  },
];

// Mock Posts
export const mockPosts: Post[] = [
  {
    id: 'p1',
    title: 'How to structure a Next.js App Router project?',
    content: "Hey everyone, I'm a final year student working on my thesis project, a forum system. I'm using the latest version of Next.js with App Router and I'm a bit confused about how to structure my folders professionally for easy maintenance. I've looked at the official docs, but I'd love to see some real-world, battle-tested examples. Any advice on where to put components, libs, hooks, and how to handle state management would be greatly appreciated!",
    author: user3,
    community: { id: 'comm1', slug: 'nextjs', name: 'Next.js Developers' },
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    votes: 128,
    comments: [
      {
        id: 'c1',
        text: "Great question! The key is separation of concerns. I always use a `features` directory inside `components` for large, feature-specific components.",
        author: user1,
        createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
        votes: 15,
        replies: [
          {
            id: 'c3',
            text: "This! And use a `shared` directory for truly reusable things like a custom Button or Card.",
            author: user2,
            createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
            votes: 8,
          }
        ]
      },
      {
        id: 'c2',
        text: "For state, avoid overusing Context API for frequently updated state. Zustand is a great lightweight alternative.",
        author: user2,
        createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        votes: 12,
      },
    ],
  },
  {
    id: 'p2',
    title: 'Shadcn UI vs. other component libraries',
    content: 'What are your thoughts on Shadcn UI? I love that I own the code, but is it scalable for a very large application compared to something like Material-UI or Mantine? Discuss!',
    author: user1,
    community: { id: 'comm2', slug: 'react', name: 'React Community' },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    votes: 76,
    comments: [],
  },
  {
    id: 'p3',
    title: 'The future of server-side rendering',
    content: 'With React Server Components, the game has changed. What do you think is the future of SSR? Will SPAs become a thing of the past for content-heavy sites?',
    author: user2,
    community: { id: 'comm3', slug: 'webdev', name: 'Web Development' },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    votes: 250,
    comments: [],
  },
];

export const getAllComments = (): UserComment[] => {
  const allComments: UserComment[] = [];

  mockPosts.forEach(post => {
    const mapComments = (comments: any[]) => {
      comments.forEach(comment => {
        allComments.push({
          ...comment,
          postId: post.id,
          postTitle: post.title,
          postAuthor: post.author.username,
        });
        if (comment.replies) {
          mapComments(comment.replies);
        }
      });
    };
    mapComments(post.comments);
  });

  return allComments;
}

export const generateUserActivity = (username: string): Activity[] => {
  const today = new Date();
  const activities: Activity[] = [];

  let seed = username.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    seed = (seed * 9301 + 49297) % 233280;
    const random = seed / 233280;

    let count = 0;
    if (random > 0.3) {
      count = Math.floor(random * 10);
    }

    let level: Activity[ "level" ] = 0;
    if (count > 0 && count <= 2) level = 1;
    else if (count > 2 && count <= 4) level = 2;
    else if (count > 4 && count <= 6) level = 3;
    else if (count > 6) level = 4;

    activities.push({
      date: date.toISOString().slice(0, 10),
      count,
      level
    });
  }

  return activities.reverse();
};
