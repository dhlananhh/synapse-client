import { useAuth } from "@/context/MockAuthContext";

export const useIsAuthor = (authorId: string): boolean => {
  const { currentUser } = useAuth();
  if (!currentUser || !authorId) {
    return false;
  }
  return currentUser.id === authorId;
};
