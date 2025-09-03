import {
  mockPosts,
  allMockUsers,
  mockCommunities,
  allMockTrophies,
} from "./mock-data";
import {
  User,
  Trophy,
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
  sortBy: SortType = "hot",
  mutedCommunityIds: string[] = []
): Promise<{ data: Post[], hasMore: boolean }> => {

  await new Promise(resolve => setTimeout(resolve, 500));

  let sortedPosts = [ ...mockPosts ];

  if (sortBy === "new") {
    sortedPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (sortBy === "top") {
    sortedPosts.sort((a, b) => b.votes - a.votes);
  }

  const visiblePosts = sortedPosts.filter(
    post => !mutedCommunityIds.includes(post.community.id)
  );

  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const postsSlice = visiblePosts.slice(start, end);
  const hasMore = end < visiblePosts.length;

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


export const deleteCommunity = async (communityId: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 1500));

  const communityIndex = mockCommunities.findIndex(c => c.id === communityId);

  if (communityIndex === -1) {
    console.warn("Attempted to delete a community that was not found.");
    throw new Error("Community not found.");
  }


  const postsToDelete = mockPosts.filter(p => p.community.id === communityId);

  postsToDelete.forEach(post => {
    const postIndex = mockPosts.findIndex(p => p.id === post.id);
    if (postIndex > -1) {
      mockPosts.splice(postIndex, 1);
    }
  });

  mockCommunities.splice(communityIndex, 1);

  console.log(`Community with ID ${communityId} and all its posts have been deleted.`);
};


export const updateCommunityModerators = async (
  communityId: string,
  moderatorIds: string[]
): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 750));

  const community = mockCommunities.find(c => c.id === communityId);
  if (!community) {
    throw new Error("Community not found while updating moderators.");
  }

  community.moderatorIds = moderatorIds;
  console.log(`Moderators for community ${community.slug} updated.`);
}


export const reportContent = async (
  itemId: string,
  itemType: 'POST' | 'COMMENT',
  reason: string,
  reportingUserId: string
): Promise<{ success: true }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log(`
    --- CONTENT REPORT SUBMITTED ---
    Item ID: ${itemId}
    Item Type: ${itemType}
    Reason: ${reason}
    Reported by User: ${reportingUserId}
    ---------------------------------
    `);

  return { success: true };
};


export const fetchPostsByIds = async (postIds: string[]): Promise<Post[]> => {
  await new Promise(resolve => setTimeout(resolve, 750));

  const foundPosts = mockPosts.filter(post => postIds.includes(post.id));

  return foundPosts.sort((a, b) => postIds.indexOf(a.id) - postIds.indexOf(b.id));
}


export const requestPasswordReset = async (email: string): Promise<{ success: true }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log(`--- PASSWORD RESET REQUESTED ---
    Email: ${email}
    -----------------------------`);

  return { success: true };
}


export const resetPassword = async (token: string, newPassword: string): Promise<{ success: true }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log(`--- PASSWORD RESET ---
    Token Used: ${token}
    New Password: [redacted]
    ----------------------`);

  return { success: true };
}


export const fetchUsersByIds = async (userIds: string[]): Promise<User[]> => {
  await new Promise(resolve => setTimeout(resolve, 750));
  const foundUsers = allMockUsers.filter(user => userIds.includes(user.id));
  return foundUsers;
};


export const fetchUserTrophies = async (username: string): Promise<Trophy[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));

  let seed = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const earnedTrophies: Trophy[] = [];

  allMockTrophies.forEach(trophy => {
    seed = (seed * 9301 + 49297) % 233280;
    const random = seed / 233280;
    if (random > 0.4) {
      earnedTrophies.push(trophy);
    }
  });

  if (earnedTrophies.length === 0) {
    return [ allMockTrophies[ 0 ] ];
  }

  return earnedTrophies;
};
