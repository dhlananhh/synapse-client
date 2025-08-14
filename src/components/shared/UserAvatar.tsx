import { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  user: User;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar { ...props }>
      <AvatarImage src={ user.avatarUrl } alt={ user.username } />
      <AvatarFallback>{ user.username.slice(0, 2).toUpperCase() }</AvatarFallback>
    </Avatar>
  )
}
