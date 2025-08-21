"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import SettingsRow from "./SettingsRow";
import ChangeDisplayNameDialog from "./dialogs/ChangeDisplayNameDialog";
import UpdateDescriptionDialog from "./dialogs/UpdateDescriptionDialog";
import { ChevronRight } from "lucide-react";


export default function ProfileTab() {
  const [ isDisplayNameDialogOpen, setIsDisplayNameDialogOpen ] = useState(false);
  const [ isDescriptionDialogOpen, setIsDescriptionDialogOpen ] = useState(false);

  const mockUserDescription = "A Senior Software Engineer with over 10 years of experience.";

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Profile Customization</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <h3 className="font-semibold px-4 pt-2">General</h3>

          <div
            onClick={ () => setIsDisplayNameDialogOpen(true) }
            className="cursor-pointer"
          >
            <SettingsRow
              title="Display name"
              description="Changing your display name won't change your username"
            >
              <span className="text-sm font-semibold">Change</span>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </SettingsRow>
          </div>

          <div
            onClick={ () => setIsDescriptionDialogOpen(true) }
            className="cursor-pointer"
          >
            <SettingsRow
              title="About description"
              description="A brief description of yourself"
            >
              <span className="text-sm font-semibold">Edit</span>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </SettingsRow>
          </div>

          <div className="cursor-pointer">
            <SettingsRow
              title="Avatar & Banner"
              description="Edit your avatar and upload a profile banner"
            >
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </SettingsRow>
          </div>

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


      <ChangeDisplayNameDialog
        isOpen={ isDisplayNameDialogOpen }
        onOpenChange={ setIsDisplayNameDialogOpen }
      />

      <UpdateDescriptionDialog
        isOpen={ isDescriptionDialogOpen }
        onOpenChange={ setIsDescriptionDialogOpen }
        currentDescription={ mockUserDescription }
      />
    </>
  );
}
