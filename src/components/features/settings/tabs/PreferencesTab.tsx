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


export default function PreferencesTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feed Preferences</CardTitle>
      </CardHeader>
      <CardContent className="p-0">

        <h3 className="font-semibold text-sm px-4 pt-2 text-muted-foreground uppercase tracking-wider">
          Language
        </h3>
        <SettingsRow
          title="Display language"
          description="Select the language for your UI"
          href="#"
        >
          <span>English</span>
          <span>Vietnamese</span>
        </SettingsRow>
        <SettingsRow
          title="Content languages"
          description="Choose languages for the content you see"
          href="#"
        >
          <span></span>
        </SettingsRow>

        <h3 className="font-semibold text-sm px-4 pt-6 text-muted-foreground uppercase tracking-wider">
          Content
        </h3>
        <SettingsRow
          title="Show mature content (I'm over 18)"
          description="See Not Safe for Work (NSFW) content in your feeds"
        >
          <Switch defaultChecked />
        </SettingsRow>
        <SettingsRow
          title="Blur mature images and media"
          description="Blur NSFW content until you click to view it">
          <Switch defaultChecked />
        </SettingsRow>
        <SettingsRow
          title="Show recommendations in home feed"
          description="Allow us to suggest content and communities for you"
        >
          <Switch defaultChecked />
        </SettingsRow>
        <SettingsRow
          title="Muted communities"
          description="Manage communities you've muted"
          href="#"
        >
          <span></span>
        </SettingsRow>

        <h3 className="font-semibold text-sm px-4 pt-6 text-muted-foreground uppercase tracking-wider">Experience</h3>
        <SettingsRow
          title="Default feed view"
          description="Choose how your feed is displayed"
          href="#"
        >
          <span>Card</span>
        </SettingsRow>
        <SettingsRow
          title="Open posts in new tab"
          description="Automatically open posts in a new browser tab"
        >
          <Switch />
        </SettingsRow>

        <h3 className="font-semibold text-sm px-4 pt-6 text-muted-foreground uppercase tracking-wider">Accessibility</h3>
        <SettingsRow
          title="Autoplay media"
          description="Play videos and GIFs automatically when they are in view"
        >
          <Switch defaultChecked />
        </SettingsRow>
        <SettingsRow
          title="Reduce Motion"
          description="Reduce animations and motion effects"
        >
          <Switch />
        </SettingsRow>

      </CardContent>
    </Card>
  );
}
