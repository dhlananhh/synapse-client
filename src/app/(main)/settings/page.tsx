"use client";

import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import AccountTab from "@/components/features/settings/AccountTab";
import ProfileTab from "@/components/features/settings/ProfileTab";


const PrivacyTab = () => <div className="text-muted-foreground p-4">Privacy settings will be here.</div>;
const PreferencesTab = () => <div className="text-muted-foreground p-4">Preferences settings will be here.</div>;
const NotificationsTab = () => <div className="text-muted-foreground p-4">Notifications settings will be here.</div>;
const EmailTab = () => <div className="text-muted-foreground p-4">Email settings will be here.</div>;


export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <AccountTab />
        </TabsContent>
        <TabsContent value="profile">
          <ProfileTab />
        </TabsContent>
        <TabsContent value="privacy">
          <PrivacyTab />
        </TabsContent>
        <TabsContent value="preferences">
          <PreferencesTab />
        </TabsContent>
        <TabsContent value="notifications">
          <NotificationsTab />
        </TabsContent>
        <TabsContent value="email">
          <EmailTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
