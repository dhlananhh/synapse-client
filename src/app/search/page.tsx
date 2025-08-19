"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { mockPosts, mockCommunities } from "@/libs/mock-data";
import { Post, Community } from "@/types";
import PostCard from "@/components/features/post/PostCard";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Users } from "lucide-react";

interface SearchResults {
  posts: Post[];
  communities: Community[];
}

function CommunityResultCard({ community }: { community: Community }) {
  return (
    <Card>
      <CardContent className="p-4">
        <Link
          href={ `/c/${community.slug}` }
          className="flex items-center gap-4 group"
        >
          <Avatar className="h-12 w-12">
            <AvatarImage src={ community.imageUrl } />
            <AvatarFallback>
              { community.name.slice(0, 2).toUpperCase() }
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold group-hover:underline">c/{ community.slug }</p>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Users className="h-3 w-3" />
              { community.memberCount.toLocaleString() } members
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}


function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [ results, setResults ] = useState<SearchResults>({ posts: [], communities: [] });
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (query) {
      const searchTimer = setTimeout(() => {
        const lowerCaseQuery = query.toLowerCase();

        const filteredPosts = mockPosts.filter(
          post => post.title.toLowerCase().includes(lowerCaseQuery) ||
            post.content.toLowerCase().includes(lowerCaseQuery)
        );

        const filteredCommunities = mockCommunities.filter(
          community => community.name.toLowerCase().includes(lowerCaseQuery) ||
            community.slug.toLowerCase().includes(lowerCaseQuery)
        );

        setResults({ posts: filteredPosts, communities: filteredCommunities });
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(searchTimer);
    } else {
      setResults({ posts: [], communities: [] });
      setIsLoading(false);
    }
  }, [ query ]);

  if (!query) {
    return <div className="text-center text-muted-foreground mt-10">Please enter a search term to begin.</div>;
  }

  return (
    <div className="m-10">
      <h1 className="text-2xl font-bold mb-4">
        Search results for: <span className="text-primary">&quot;{ query }&quot;</span>
      </h1>

      {
        isLoading ? (
          <p className="text-muted-foreground">Searching...</p>
        ) : (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-3">Communities</h2>
              { results.communities.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  { results.communities.map(community => <CommunityResultCard key={ community.id } community={ community } />) }
                </div>
              ) : (
                <p className="text-muted-foreground">No matching communities found.</p>
              ) }
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Posts</h2>
              {
                results.posts.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    { results.posts.map(post => <PostCard key={ post.id } post={ post } />) }
                  </div>
                ) : (
                  <p className="text-muted-foreground">No matching posts found.</p>
                )
              }
            </div>
          </div>
        )
      }
    </div>
  );
}


export default function SearchPage() {
  return (
    <Suspense fallback={ <div className="text-center text-muted-foreground mt-10">Loading search...</div> }>
      <SearchResultsContent />
    </Suspense>
  );
}
