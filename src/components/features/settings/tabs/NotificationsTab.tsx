"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SettingsRow from "./SettingsRow";


export default function NotificationsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
      </CardHeader>
      <CardContent className="p-0">

        <h3 className="font-semibold text-sm px-4 pt-2 text-muted-foreground uppercase tracking-wider">
          General
        </h3>
        <SettingsRow
          title="Community notifications"
          description="Control notifications for communities you've joined"
          href="#"
        >
          <span>All on</span>
        </SettingsRow>

        <h3 className="font-semibold text-sm px-4 pt-6 text-muted-foreground uppercase tracking-wider">
          Messages
        </h3>
        <SettingsRow
          title="Chat messages"
          description="Receive notifications for new chat messages"
          href="#"
        >
          <span>
            All on
          </span>
        </SettingsRow>
        <SettingsRow
          title="Chat requests"
          description="Receive notifications for new chat requests"
          href="#"
        >
          <span>
            All on
          </span>
        </SettingsRow>
        <SettingsRow
          title="Mark all as read"
          description="Mark all chat conversations as read"
        >
          <Button size="sm">Mark as read</Button>
        </SettingsRow>

        <h3 className="font-semibold text-sm px-4 pt-6 text-muted-foreground uppercase tracking-wider">
          Activity
        </h3>
        <SettingsRow
          title="Mentions of u/username"
          description="Get notified when someone mentions your username" href="#"
        >
          <span>
            All on
          </span>
        </SettingsRow>
        <SettingsRow
          title="Comments on your posts"
          description="Get notified about new comments on your posts"
          href="#"
        >
          <span>
            All on
          </span>
        </SettingsRow>
        <SettingsRow
          title="Upvotes on your posts"
          description="Get notified when your posts are upvoted"
          href="#"
        >
          <span>
            All on
          </span>
        </SettingsRow>
        <SettingsRow
          title="Replies to your comments"
          description="Get notified about replies to your comments"
          href="#"
        >
          <span>All on</span>
        </SettingsRow>
        <SettingsRow
          title="New followers"
          description="Get notified when someone follows you"
          href="#"
        >
          <span>All on</span>
        </SettingsRow>

      </CardContent>
    </Card>
  );
}
