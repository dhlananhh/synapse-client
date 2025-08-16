"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { Post } from '@/types';
import { fetchPosts, SortType } from '@/lib/api';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

import SortTabs from './SortTabs';
import PostCard from './PostCard';
import PostFeedSkeleton from './PostFeedSkeleton';
import EmptyState from '@/components/shared/EmptyState';
import { Globe, Loader2 } from 'lucide-react';

export default function PostFeed() {
  const [ posts, setPosts ] = useState<Post[]>([]);
  const [ page, setPage ] = useState(1);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isInitialLoading, setIsInitialLoading ] = useState(true);
  const [ hasMore, setHasMore ] = useState(true);
  const [ sortBy, setSortBy ] = useState<SortType>('hot');

  const initialLoadPerformed = useRef(false);

  const loadPosts = useCallback(async (isNewSort = false) => {
    if (isLoading || (!hasMore && !isNewSort)) return;

    setIsLoading(true);

    const pageToFetch = isNewSort ? 1 : page;

    try {
      const { data: newPosts, hasMore: newHasMore } = await fetchPosts(pageToFetch, sortBy);

      setPosts(prevPosts => isNewSort ? newPosts : [ ...prevPosts, ...newPosts ]);
      setPage(pageToFetch + 1);
      setHasMore(newHasMore);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
      if (isInitialLoading) {
        setIsInitialLoading(false);
      }
    }
  }, [ isLoading, hasMore, page, sortBy, isInitialLoading ]);

  useEffect(() => {
    if (!initialLoadPerformed.current) {
      setIsInitialLoading(true);
      loadPosts(true);
      initialLoadPerformed.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    if (initialLoadPerformed.current) {
      setIsInitialLoading(true);
      setPosts([]);
      loadPosts(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ sortBy ]);


  const { lastElementRef } = useIntersectionObserver({
    onIntersect: () => loadPosts(false),
    isLoading,
    hasMore
  });

  const handleSortChange = (newSort: SortType) => {
    if (newSort === sortBy) return;
    setSortBy(newSort);
  }

  return (
    <div>
      <SortTabs currentSort={ sortBy } onSortChange={ handleSortChange } />

      { isInitialLoading ? (
        <PostFeedSkeleton />
      ) : posts.length === 0 ? (
        <EmptyState
          Icon={ Globe }
          title="The Feed is Empty"
          description="There are no posts to show right now. Why not be the first to create one?"
          action={ {
            label: "Create a Post",
            href: "/submit"
          } }
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            { posts.map((post, index) => {
              if (index === posts.length - 1) {
                return <PostCard ref={ lastElementRef } key={ post.id } post={ post } />;
              }
              return <PostCard key={ post.id } post={ post } />;
            }) }
          </div>

          { isLoading && !isInitialLoading && (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) }

          { !hasMore && posts.length > 0 && (
            <div className="text-center text-muted-foreground py-10">
              <p>You&apos;ve reached the end of the line!</p>
            </div>
          ) }
        </>
      ) }
    </div>
  );
}
