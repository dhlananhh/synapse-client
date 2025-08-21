"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TUpdateDescriptionSchema,
  UpdateDescriptionSchema
} from "@/libs/validators/user-validator";
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
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";


interface UpdateDescriptionDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  currentDescription?: string;
}


export default function UpdateDescriptionDialog({
  isOpen,
  onOpenChange,
  currentDescription
}: UpdateDescriptionDialogProps) {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<TUpdateDescriptionSchema>({
    resolver: zodResolver(UpdateDescriptionSchema),
    defaultValues: {
      description: currentDescription || "",
    }
  });

  const onSubmit = async (data: TUpdateDescriptionSchema) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Updating description:", data);
    toast.success("Description updated successfully.");
    onOpenChange(false);
  };

  return (
    <Dialog open={ isOpen } onOpenChange={ onOpenChange }>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit about description</DialogTitle>
          <DialogDescription>
            A brief description of yourself. This will appear on your public profile.
          </DialogDescription>
        </DialogHeader>

        <form
          id="update-description-form"
          onSubmit={ handleSubmit(onSubmit) }
          className="py-4"
        >
          <Textarea
            { ...register("description") }
            placeholder="Tell the community a little about yourself..."
            rows={ 5 }
            maxLength={ 200 }
          />
          <div className="text-right text-xs text-muted-foreground mt-2">
            { errors.description?.message }
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
            form="update-description-form"
            disabled={ isSubmitting || !dirtyFields.description }
          >
            { isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" /> }
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
