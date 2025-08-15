import PostCardSkeleton from "./PostCardSkeleton";

const POSTS_PER_PAGE = 6;

export default function PostFeedSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      { Array.from({ length: POSTS_PER_PAGE }).map((_, index) => (
        <PostCardSkeleton key={ index } />
      )) }
    </div>
  )
}
