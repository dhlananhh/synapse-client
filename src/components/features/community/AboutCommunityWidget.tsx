import { Community } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Cake, Users } from "lucide-react";

interface AboutCommunityWidgetProps {
  community: Community;
}

export default function AboutCommunityWidget({ community }: AboutCommunityWidgetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About c/{ community.slug }</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{ community.description }</p>

        <div className="flex flex-col gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Cake className="h-5 w-5" />
            <span>Created { format(new Date(community.createdAt), "MMM d, yyyy") }</span>
          </div>
          <hr />
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <span>{ community.memberCount.toLocaleString() } members</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
