"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TChangeEmailSchema, ChangeEmailSchema } from "@/libs/validators/user-validator";
import { toast } from "sonner";
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


interface ChangeEmailDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  currentEmail: string;
}


export default function ChangeEmailDialog({
  isOpen,
  onOpenChange,
  currentEmail
}: ChangeEmailDialogProps) {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<TChangeEmailSchema>({
    resolver: zodResolver(ChangeEmailSchema)
  });

  const onSubmit = async (data: TChangeEmailSchema) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log("Updating email:", data);

    toast.success("Verification email sent", {
      description: `A confirmation link has been sent to ${data.newEmail}. Please verify to complete the change.`
    });

    onOpenChange(false);
    reset();
  };

  return (
    <Dialog
      open={ isOpen }
      onOpenChange={ onOpenChange }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change your email address</DialogTitle>
          <DialogDescription>
            Your current email is <strong>{ currentEmail }</strong>.
            A verification link will be sent to the new address.
          </DialogDescription>
        </DialogHeader>

        <form
          id="change-email-form"
          onSubmit={ handleSubmit(onSubmit) }
          className="space-y-4 py-4"
        >
          <div className="space-y-2">
            <Label htmlFor="newEmail">New email address</Label>
            <Input id="newEmail" type="email" { ...register("newEmail") } />
            { errors.newEmail && <p className="text-sm text-destructive">{ errors.newEmail.message }</p> }
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Confirm with your password</Label>
            <Input id="password" type="password" { ...register("password") } />
            { errors.password && <p className="text-sm text-destructive">{ errors.password.message }</p> }
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
            form="change-email-form"
            disabled={ isSubmitting }
          >
            { isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" /> }
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
