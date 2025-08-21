"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import SettingsRow from "./SettingsRow";


export default function AccountTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <h3 className="font-semibold px-4 pt-2">General</h3>
        <SettingsRow
          title="Email address"
          description="youremail@example.com"
          href="#"
        >
          <span>Change</span>
        </SettingsRow>
        <SettingsRow
          title="Gender"
          description="Update your gender"
          href="#"
        >
          <span></span>
        </SettingsRow>

        <h3 className="font-semibold px-4 pt-6">Account authorization</h3>
        <SettingsRow
          title="Google"
          description="Connect to log in with your Google account"
        >
          <Button variant="outline" size="sm">Disconnect</Button>
        </SettingsRow>
        <SettingsRow
          title="Apple"
          description="Connect to log in with your Apple account">
          <Button variant="default" size="sm">Connect</Button>
        </SettingsRow>
        <SettingsRow
          title="Two-factor authentication"
          description="Enhance your account security"
        >
          <Switch />
        </SettingsRow>

        <h3 className="font-semibold px-4 pt-6">Advanced</h3>
        <SettingsRow
          title="Delete account"
          description="Permanently delete your account and all data"
          href="#"
        >
          <span></span>
        </SettingsRow>
      </CardContent>
    </Card>
  );
}
