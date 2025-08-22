"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import SettingsRow from "../SettingsRow";


export default function EmailTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Settings</CardTitle>
      </CardHeader>
      <CardContent className="p-0">

        <h3 className="font-semibold text-sm px-4 pt-2 text-muted-foreground uppercase tracking-wider">Messages</h3>
        <SettingsRow
          title="Chat requests"
          description="Send email notifications for new chat requests"
        >
          <Switch defaultChecked />
        </SettingsRow>

        <h3 className="font-semibold text-sm px-4 pt-6 text-muted-foreground uppercase tracking-wider">Activity</h3>
        <SettingsRow
          title="New user welcome"
          description="Send a welcome email upon registration"
        >
          <Switch defaultChecked />
        </SettingsRow>
        <SettingsRow
          title="Comments on your posts"
          description="Send emails for new comments on your posts"
        >
          <Switch defaultChecked />
        </SettingsRow>
        <SettingsRow
          title="Replies to your comments"
          description="Send emails for new replies to your comments"
        >
          <Switch defaultChecked />
        </SettingsRow>
        <SettingsRow
          title="Upvotes on your posts"
          description="Send emails when your posts are upvoted"
        >
          <Switch defaultChecked />
        </SettingsRow>
        <SettingsRow title="New followers"
          description="Send an email when a new user follows you"
        >
          <Switch defaultChecked />
        </SettingsRow>

        <h3 className="font-semibold text-sm px-4 pt-6 text-muted-foreground uppercase tracking-wider">
          Newsletters
        </h3>
        <SettingsRow
          title="Daily Digest"
          description="Receive a daily summary of top posts"
        >
          <Switch />
        </SettingsRow>
        <SettingsRow
          title="Weekly Recap"
          description="Receive a weekly recap of popular content"
        >
          <Switch defaultChecked />
        </SettingsRow>

        <h3 className="font-semibold text-sm px-4 pt-6 text-muted-foreground uppercase tracking-wider">Advanced</h3>
        <SettingsRow
          title="Unsubscribe from all emails"
          description="Disable all email notifications from Synapse"
        >
          <Switch />
        </SettingsRow>

      </CardContent>
    </Card>
  );
}
