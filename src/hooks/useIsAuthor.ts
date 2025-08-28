import { useAuth } from "@/context/AuthContext";

export const useIsAuthor = (authorId: string): boolean => {
  const { currentUser } = useAuth();
  if (!currentUser || !authorId) {
    return false;
  }
  return currentUser.id === authorId;
};
