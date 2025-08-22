"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import SettingsRow from "../SettingsRow";
import ChangeEmailDialog from "../dialogs/ChangeEmailDialog";
import UpdateGenderDialog from "../dialogs/UpdateGenderDialog";
import DeleteAccountDialog from "../dialogs/DeleteAccountDialog";
import { ChevronRight } from "lucide-react";


export default function AccountTab() {
  const { currentUser } = useAuth();
  const [ isEmailDialogOpen, setIsEmailDialogOpen ] = useState(false);
  const [ isGenderDialogOpen, setIsGenderDialogOpen ] = useState(false);
  const [ isDeleteDialogOpen, setIsDeleteDialogOpen ] = useState(false);

  const userEmail = "youremail@gmail.com";

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="uppercase">Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <h3 className="font-semibold px-4 pt-2">General</h3>

          <div
            onClick={ () => setIsEmailDialogOpen(true) }
            className="cursor-pointer"
          >
            <SettingsRow
              title="Email address"
              description={ userEmail }
            >
              <Button variant="outline" size="sm">Change</Button>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </SettingsRow>
          </div>

          <div
            onClick={ () => setIsGenderDialogOpen(true) }
            className="cursor-pointer"
          >
            <SettingsRow
              title="Gender"
              description="Update your gender"
            >
              <Button variant="outline" size="sm">Update</Button>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </SettingsRow>
          </div>

          <h3 className="font-semibold px-4 pt-6">Account authorization</h3>
          <SettingsRow
            title="Google"
            description="Connect to log in with your Google account"
          >
            <Button variant="outline" size="sm">Disconnect</Button>
          </SettingsRow>
          <SettingsRow
            title="Apple"
            description="Connect to log in with your Apple account"
          >
            <Button variant="default" size="sm">Connect</Button>
          </SettingsRow>
          <SettingsRow
            title="Two-factor authentication"
            description="Enhance your account security"
          >
            <Switch />
          </SettingsRow>

          <h3 className="font-semibold px-4 pt-6">Advanced</h3>

          <div
            onClick={ () => setIsDeleteDialogOpen(true) }
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            <SettingsRow
              title="Delete account"
              description="Permanently delete your account and all data"
            >
              <ChevronRight className="h-5 w-5" />
            </SettingsRow>
          </div>
        </CardContent>
      </Card>


      <ChangeEmailDialog
        isOpen={ isEmailDialogOpen }
        onOpenChange={ setIsEmailDialogOpen }
        currentEmail={ userEmail }
      />

      <UpdateGenderDialog
        isOpen={ isGenderDialogOpen }
        onOpenChange={ setIsGenderDialogOpen }
        currentGender={ currentUser?.gender }
      />

      <DeleteAccountDialog
        isOpen={ isDeleteDialogOpen }
        onOpenChange={ setIsDeleteDialogOpen }
      />
    </>
  );
}
