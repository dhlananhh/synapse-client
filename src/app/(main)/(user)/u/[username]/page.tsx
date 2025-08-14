import { notFound } from "next/navigation";
import { mockPosts, mockCommunities } from "@/lib/mock-data";
import { getAllComments } from "@/lib/mock-data";
import UserProfile from "@/components/features/user/UserProfile";
import { User, Post, UserComment } from "@/types";

const getUserProfileData = (username: string) => {
  const allUsers: User[] = [
    ...new Set(mockPosts.map(p => p.author))
  ];
  const user = allUsers.find(u => u.username === username);

  if (!user) {
    return null;
  }

  const userPosts = mockPosts.filter(p => p.author.id === user.id);
  const userComments = getAllComments().filter(c => c.author.id === user.id);

  return { user, userPosts, userComments };
}

export default function ProfilePage({ params }: { params: { username: string } }) {
  const data = getUserProfileData(params.username);

  if (!data) {
    notFound();
  }

  return <UserProfile { ...data } />
}
