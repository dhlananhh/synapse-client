"use client";


import React, { useState } from "react";
import { toast } from "sonner";
import { useChatStore } from "@/store/useChatStore";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/shared/UserAvatar";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import {
  Cake,
  Zap,
  MessageSquare,
  MoreHorizontal,
  ShieldOff,
  UserX
} from "lucide-react";
import { format } from "date-fns";


export default function ProfileHeader({
  user,
  postCount
}: {
  user: User,
  postCount: number
}) {
  const {
    currentUser,
    isBlocked,
    toggleBlockUser
  } = useAuth();

  const { openChat } = useChatStore();

  const canChat = currentUser && currentUser.id !== user.id;

  const handleMessageClick = () => {
    if (!canChat) return;
    openChat(user);
  }

  const [ isBlockDialogOpen, setIsBlockDialogOpen ] = useState(false);
  const [ isUpdatingBlock, setIsUpdatingBlock ] = useState(false);

  const canInteract = currentUser && currentUser.id !== user.id;
  const isUserBlocked = isBlocked(user.id);

  const handleBlock = () => {
    setIsBlockDialogOpen(true);
  }

  const handleConfirmBlock = async () => {
    setIsUpdatingBlock(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    toggleBlockUser(user.id);
    toast.success(isUserBlocked ? `Unblocked u/${user.username}` : `Blocked u/${user.username}`, {
      description: isUserBlocked ? "You will now see their content again." : "You will no longer see their posts or comments."
    });
    setIsUpdatingBlock(false);
    setIsBlockDialogOpen(false);
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 sm:items-end justify-between">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
          <UserAvatar user={ user } className="h-24 w-24 sm:h-32 sm:w-32 text-4xl" />

          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold">{ user.username }</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-2">
              <div className="flex items-center gap-1">
                <Zap className="h-4 w-4" />
                <span>{ user.karma.toLocaleString() } Karma</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <span>{ postCount } Posts</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Cake className="h-4 w-4" />
                <span>Joined { format(new Date(user.createdAt), "MMM d, yyyy") }</span>
              </div>
            </div>
          </div>
        </div>

        {
          canInteract && (
            <div className="flex items-center gap-1">
              <Button onClick={ handleMessageClick }>
                <MessageSquare className="h-4 w-4" />
                Message
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={ handleBlock }
                    className={ isUserBlocked
                      ? "focus:bg-green-100 dark:focus:bg-green-900"
                      : "text-destructive focus:bg-destructive/10 focus:text-destructive"
                    }
                  >
                    { isUserBlocked ? <ShieldOff className="mr-2 h-4 w-4" /> : <UserX className="mr-2 h-4 w-4" /> }
                    { isUserBlocked ? "Unblock User" : "Block User" }
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )
        }
      </div>


      <ConfirmDialog
        open={ isBlockDialogOpen }
        onOpenChange={ setIsBlockDialogOpen }
        onConfirm={ handleConfirmBlock }
        isConfirming={ isUpdatingBlock }
        title={ isUserBlocked ? `Unblock u/${user.username}?` : `Block u/${user.username}?` }
        description={ isUserBlocked
          ? "Their content will reappear in your feeds and you will be able to message them again."
          : "You will not see their posts or comments, and they will not be able to message you. This does not apply to moderation actions in communities you manage."
        }
        confirmText={ isUserBlocked ? "Unblock" : "Block" }
        isDestructive={ !isUserBlocked }
      />
    </>
  )
}
