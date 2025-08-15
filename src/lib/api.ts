import { mockPosts } from "./mock-data";
import { Post } from "@/types";

const POSTS_PER_PAGE = 6;

export const fetchPosts = async (page: number): Promise<{ data: Post[], hasMore: boolean }> => {
  await new Promise(resolve => setTimeout(resolve, 750));

  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const postsSlice = mockPosts.slice(start, end);
  const hasMore = end < mockPosts.length;

  return {
    data: postsSlice,
    hasMore: hasMore,
  };
}
