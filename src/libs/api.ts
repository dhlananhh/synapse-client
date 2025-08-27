import { mockPosts, allMockUsers } from "./mock-data";
import {
  User,
  Post,
  Comment,
  SortType,
} from "@/types";
import { TPostSchema } from "./validators/post-validator";


const POSTS_PER_PAGE = 6;


// export const fetchPosts = async (page: number): Promise<{ data: Post[], hasMore: boolean }> => {
//   await new Promise(resolve => setTimeout(resolve, 750));

//   const start = (page - 1) * POSTS_PER_PAGE;
//   const end = start + POSTS_PER_PAGE;

//   const postsSlice = mockPosts.slice(start, end);
//   const hasMore = end < mockPosts.length;

//   return {
//     data: postsSlice,
//     hasMore: hasMore,
//   };
// }


export const fetchPosts = async (
  page: number,
  sortBy: SortType = "hot"
): Promise<{ data: Post[], hasMore: boolean }> => {

  await new Promise(resolve => setTimeout(resolve, 500));

  let sortedPosts = [ ...mockPosts ];

  if (sortBy === "new") {
    sortedPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (sortBy === "top") {
    sortedPosts.sort((a, b) => b.votes - a.votes);
  }

  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const postsSlice = sortedPosts.slice(start, end);
  const hasMore = end < sortedPosts.length;

  return {
    data: postsSlice,
    hasMore: hasMore,
  };
}


export const fetchPostById = async (postId: string): Promise<Post> => {
  console.log("Attempting to fetch post:", postId);
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (postId.includes("error")) {
    throw new Error("Failed to fetch post from the database. The connection timed out.");
  }

  const post = mockPosts.find(p => p.id === postId);

  if (!post) {
    const notFoundError = new Error("Post not found");
    (notFoundError as any).status = 404;
    throw notFoundError;
  }

  return post;
}

export const updatePost = async (
  postId: string,
  data: Pick<TPostSchema, "title" | "content">
): Promise<Post> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const postIndex = mockPosts.findIndex(p => p.id === postId);
  if (postIndex === -1) {
    throw new Error("Post not found to update");
  }

  mockPosts[ postIndex ] = {
    ...mockPosts[ postIndex ],
    title: data.title,
    content: data.content,
  };

  return mockPosts[ postIndex ];
};

export const deletePost = async (postId: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const postIndex = mockPosts.findIndex(p => p.id === postId);
  if (postIndex === -1) {
    console.warn("Attempted to delete a post that was not found.");
    return;
  }

  mockPosts.splice(postIndex, 1);
};

const findCommentAndParent = (comments: Comment[], commentId: string): {
  comment: Comment | null; parent: Comment[] | null
} => {
  for (const comment of comments) {
    if (comment.id === commentId) {
      return { comment, parent: comments };
    }
    if (comment.replies) {
      const found = findCommentAndParent(comment.replies, commentId);
      if (found.comment) return found;
    }
  }
  return { comment: null, parent: null };
};


export const updateComment = async (postId: string, commentId: string, newText: string): Promise<Comment> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const post = mockPosts.find(p => p.id === postId);
  if (!post) throw new Error("Post not found");

  const { comment } = findCommentAndParent(post.comments, commentId);
  if (!comment) throw new Error("Comment not found to update");

  comment.text = newText;
  return comment;
}


export const deleteComment = async (postId: string, commentId: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const post = mockPosts.find(p => p.id === postId);
  if (!post) throw new Error("Post not found");

  const { parent, comment } = findCommentAndParent(post.comments, commentId);
  if (parent && comment) {
    const index = parent.indexOf(comment);
    if (index > -1) {
      parent.splice(index, 1);
    }
  }
}


export const fetchCommunityMembers = async (
  communitySlug: string,
  page: number
): Promise<{ data: User[], hasMore: boolean }> => {
  await new Promise(resolve => setTimeout(resolve, 750));

  const membersWithRoles = allMockUsers.map((user, index) => ({
    ...user,
    role: index === 0 ? 'Moderator' : 'Member',
  }));

  const MEMBERS_PER_PAGE = 20;
  const start = (page - 1) * MEMBERS_PER_PAGE;
  const end = start + MEMBERS_PER_PAGE;

  const membersSlice = membersWithRoles.slice(start, end);
  const hasMore = end < membersWithRoles.length;

  return { data: membersSlice, hasMore };
}
