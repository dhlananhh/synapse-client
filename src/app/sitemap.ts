import { MetadataRoute } from "next";
import { mockCommunities, mockPosts } from "@/lib/mock-data";
import { PATHS } from "@/lib/paths";


export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const staticRoutes = [
    PATHS.home,
    PATHS.feed,
    PATHS.login,
    PATHS.register,
    PATHS.submit,
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const communityRoutes = mockCommunities.map((community) => ({
    url: `${siteUrl}${PATHS.community(community.slug)}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const postRoutes = mockPosts.map((post) => ({
    url: `${siteUrl}${PATHS.post(post.id)}`,
    lastModified: new Date(post.createdAt).toISOString(),
    changeFrequency: "weekly" as const,
    priority: 1.0,
  }));

  const allUsers = [ ...new Map(mockPosts.map(post => [ post.author.username, post.author ])).values() ];
  const userRoutes = allUsers.map((user) => ({
    url: `${siteUrl}${PATHS.userProfile(user.username)}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));


  return [
    ...staticRoutes,
    ...communityRoutes,
    ...postRoutes,
    ...userRoutes
  ];
} 
