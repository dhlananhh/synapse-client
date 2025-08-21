"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TUserProfileSchema,
  UserProfileSchema
} from "@/libs/validators/user-validator";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";


interface ChangeDisplayNameDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}


export default function ChangeDisplayNameDialog({
  isOpen,
  onOpenChange
}: ChangeDisplayNameDialogProps) {

  const { currentUser, updateUserProfile } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<TUserProfileSchema>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      username: currentUser?.username || ""
    }
  });

  const onSubmit = async (data: TUserProfileSchema) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log("Updating username:", data);
    updateUserProfile(data);

    toast.success("Display name updated successfully.");
    onOpenChange(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      reset({ username: currentUser?.username || "" });
    }
    onOpenChange(open);
  }

  return (
    <Dialog open={ isOpen } onOpenChange={ handleOpenChange }>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change your display name</DialogTitle>
          <DialogDescription>
            This will also be your new username. Choose wisely, you can only change this once every 30 days.
          </DialogDescription>
        </DialogHeader>

        <form
          id="change-display-name-form"
          onSubmit={ handleSubmit(onSubmit) }
          className="space-y-4 py-4"
        >
          <div className="space-y-2">
            <Label htmlFor="username">New display name</Label>
            <Input id="username" type="text" { ...register("username") } />
            { errors.username && <p className="text-sm text-destructive">{ errors.username.message }</p> }
          </div>
        </form>

        <DialogFooter>
          <Button
            type="button"
            variant="ghost"
            onClick={ () => onOpenChange(false) }
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="change-display-name-form"
            disabled={ isSubmitting }
          >
            { isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" /> }
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
