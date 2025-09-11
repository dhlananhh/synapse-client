"use client";


import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { useAuth } from "@/context/AuthContext";
import { useChatStore } from "@/store/useChatStore";
import { User } from "@/types";
import { toast } from "sonner";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import KarmaBreakdown from "./KarmaBreakdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CalendarPlus,
  Zap,
  Pencil,
  MessageSquare,
  MoreHorizontal,
  ShieldOff,
  UserX,
  UserCheck,
  UserPlus
} from "lucide-react";


interface ProfileHeaderProps {
  user: User;
  postCount: number;
}


export default function ProfileHeader({
  user,
  postCount
}: ProfileHeaderProps) {
  const {
    currentUser,
    isFollowing,
    toggleFollowUser,
    isBlocked,
    toggleBlockUser
  } = useAuth();
  const { openChat } = useChatStore();

  const isOwnProfile = currentUser?.id === user.id;
  const canInteract = currentUser && !isOwnProfile;

  const [ isBlockDialogOpen, setIsBlockDialogOpen ] = useState(false);
  const [ isUpdatingBlock, setIsUpdatingBlock ] = useState(false);
  const [ isUnfollowDialogOpen, setIsUnfollowDialogOpen ] = useState(false);
  const [ isConfirmingUnfollow, setIsConfirmingUnfollow ] = useState(false);

  const isUserFollowed = isFollowing(user.id);
  const isUserBlocked = isBlocked(user.id);
  const totalKarma = user.karma.post + user.karma.comment;
  const defaultBannerUrl = `https://placehold.co/1200x400/334155/e2e8f0?text=${user.username}`;

  const handleMessageClick = () => {
    if (!canInteract) return;
    openChat(user);
  };

  const handleFollowClick = () => {
    if (!canInteract) return;
    if (isUserFollowed) {
      setIsUnfollowDialogOpen(true);
    } else {
      toggleFollowUser(user.id);
      toast.success(`You are now following u/${user.username}`);
    }
  };

  const handleConfirmUnfollow = async () => {
    setIsConfirmingUnfollow(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    toggleFollowUser(user.id);
    toast.success(`You have unfollowed u/${user.username}`);
    setIsConfirmingUnfollow(false);
    setIsUnfollowDialogOpen(false);
  };

  const handleBlock = () => {
    if (!canInteract) return;
    setIsBlockDialogOpen(true);
  }

  const handleConfirmBlock = async () => {
    setIsUpdatingBlock(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    toggleBlockUser(user.id);
    toast.success(
      isUserBlocked
        ? `Unblocked u/${user.username}`
        : `Blocked u/${user.username}`
      , {
        description:
          isUserBlocked
            ? "You will now see their content again."
            : "You will no longer see their posts or comments."
      }
    );
    setIsUpdatingBlock(false);
    setIsBlockDialogOpen(false);
  }

  return (
    <>
      <div className="rounded-lg overflow-hidden bg-card">
        <div className="relative h-48 sm:h-64 bg-secondary">
          <Image
            src={ user.bannerUrl || defaultBannerUrl }
            alt={ `${user.username}"s banner` }
            fill
            priority
            className="object-cover"
            unoptimized={ true }
          />
        </div>

        <div className="p-4 relative">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end -mt-20 sm:-mt-24">
            <UserAvatar
              user={ user }
              className="h-28 w-28 sm:h-36 sm:w-36 border-4 border-background"
            />

            <div className="flex items-center gap-2 mt-4 sm:mt-0">
              {
                isOwnProfile && (
                  <Button
                    asChild
                    variant="outline"
                  >
                    <Link href="/settings">
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Link>
                  </Button>
                )
              }
              {
                canInteract && (
                  <div className="flex items-center gap-1">
                    <Button
                      onClick={ handleFollowClick }
                      variant="default"
                    >
                      {
                        isUserFollowed
                          ? <UserCheck className="mr-2 h-4 w-4" />
                          : <UserPlus className="mr-2 h-4 w-4" />
                      }
                      {
                        isUserFollowed ? "Following" : "Follow"
                      }
                    </Button>
                    <Button
                      onClick={ handleMessageClick }
                      variant="secondary"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={ handleBlock }
                          className={
                            isUserBlocked
                              ? "focus:bg-green-100 dark:focus:bg-green-900"
                              : "text-destructive focus:bg-destructive/10 focus:text-destructive"
                          }
                        >
                          {
                            isUserBlocked
                              ? <ShieldOff className="mr-2 h-4 w-4" />
                              : <UserX className="mr-2 h-4 w-4" />
                          }
                          {
                            isUserBlocked ? "Unblock User" : "Block User"
                          }
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )
              }
            </div>
          </div>

          <div className="mt-4">
            <h1 className="text-2xl sm:text-3xl font-bold">
              { user.displayName || user.username }
            </h1>
            <p className="text-sm text-muted-foreground -mt-0.5">
              u/{ user.username }
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-3">
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-primary">
                    <Zap className="h-4 w-4" />
                    <span>
                      { totalKarma.toLocaleString() } Karma
                    </span>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <KarmaBreakdown karma={ user.karma } />
                </PopoverContent>
              </Popover>

              <span className="hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <span>
                  { postCount } Posts
                </span>
              </div>

              <span className="hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <CalendarPlus className="h-4 w-4" />
                <span>
                  Joined { format(new Date(user.createdAt), "MMM d, yyyy") }
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>


      <ConfirmDialog
        open={ isUnfollowDialogOpen }
        onOpenChange={ setIsUnfollowDialogOpen }
        onConfirm={ handleConfirmUnfollow }
        isConfirming={ isConfirmingUnfollow }
        title={ `Unfollow u/${user.username}?` }
        description="They will no longer appear in your personalized feeds. They will not be notified."
        confirmText="Unfollow"
      />

      <ConfirmDialog
        open={ isBlockDialogOpen }
        onOpenChange={ setIsBlockDialogOpen }
        onConfirm={ handleConfirmBlock }
        isConfirming={ isUpdatingBlock }
        title={ isUserBlocked ? `Unblock u/${user.username}?` : `Block u/${user.username}?` }
        description={ isUserBlocked
          ? "Their content will reappear in your feeds and you will be able to message them again."
          : "You will not see their posts or comments, and they will not be able to message you."
        }
        confirmText={ isUserBlocked ? "Unblock" : "Block" }
        isDestructive={ !isUserBlocked }
      />
    </>
  );
}
