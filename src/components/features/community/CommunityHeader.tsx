"use client";

import { useAuth } from "@/context/AuthContext";
import { Community } from "@/types";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommunityHeaderProps {
  community: Community;
}

export default function CommunityHeader({ community }: CommunityHeaderProps) {
  const { currentUser, isSubscribed, subscribeToCommunity, unsubscribeFromCommunity } = useAuth();
  const subscribed = isSubscribed(community.id);

  const handleSubscription = () => {
    if (subscribed) {
      unsubscribeFromCommunity(community.id);
    } else {
      subscribeToCommunity(community.id);
    }
  };

  return (
    <div className="mb-6">
      <div className="h-24 bg-secondary rounded-t-lg" />
      <div className="p-4 bg-card rounded-b-lg flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-10 sm:-mt-8">
        <div className="flex items-end gap-3">
          <Avatar className="h-16 w-16 border-4 border-card">
            <AvatarImage src={ community.imageUrl } alt={ community.name } />
            <AvatarFallback>{ community.name.slice(0, 2).toUpperCase() }</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{ community.name }</h1>
            <p className="text-sm text-muted-foreground">c/{ community.slug }</p>
          </div>
        </div>
        { currentUser && (
          <Button onClick={ handleSubscription }>
            { subscribed ? 'Leave' : 'Join' }
          </Button>
        ) }
      </div>
    </div>
  )
}
