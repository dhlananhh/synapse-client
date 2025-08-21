"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import SettingsRow from "./SettingsRow";


export default function ProfileTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Customization</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <h3 className="font-semibold px-4 pt-2">General</h3>
        <SettingsRow
          title="Display name"
          description="Changing your display name won't change your username"
          href="#"
        >
          <span>Change</span>
        </SettingsRow>
        <SettingsRow
          title="About description"
          description="A brief description of yourself"
          href="#"
        >
          <span>Edit</span>
        </SettingsRow>
        <SettingsRow
          title="Avatar"
          description="Edit your avatar or upload an image"
          href="#"
        >
          <span></span>
        </SettingsRow>

        <h3 className="font-semibold px-4 pt-6">Curate your profile</h3>
        <SettingsRow
          title="Mark as mature (18+)"
          description="Labels your profile as Not Safe for Work (NSFW)"
        >
          <Switch />
        </SettingsRow>
        <SettingsRow
          title="NSFW"
          description="Show all NSFW posts and comments on your profile"
        >
          <Switch defaultChecked />
        </SettingsRow>
        <SettingsRow
          title="Followers"
          description="Show your follower count"
        >
          <Switch />
        </SettingsRow>
      </CardContent>
    </Card>
  );
}
