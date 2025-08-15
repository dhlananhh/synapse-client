import { mockPosts } from "./mock-data";
import { Post } from "@/types";

const POSTS_PER_PAGE = 6;
export type SortType = "hot" | "new" | "top";


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
