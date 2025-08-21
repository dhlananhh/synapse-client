"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TUpdateGenderSchema, UpdateGenderSchema } from "@/libs/validators/user-validator";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";


interface UpdateGenderDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  currentGender?: string;
}

export default function UpdateGenderDialog({
  isOpen,
  onOpenChange,
  currentGender
}: UpdateGenderDialogProps) {

  const form = useForm<TUpdateGenderSchema>({
    resolver: zodResolver(UpdateGenderSchema),
    defaultValues: { gender: (currentGender as any) || "none" }
  });

  const onSubmit = async (data: TUpdateGenderSchema) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Updating gender:", data);
    toast.success("Gender updated successfully.");
    onOpenChange(false);
  };

  return (
    <Dialog open={ isOpen } onOpenChange={ onOpenChange }>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update your gender</DialogTitle>
          <DialogDescription>This information is private and will not be displayed on your public profile.</DialogDescription>
        </DialogHeader>

        <Form { ...form }>
          <form
            id="update-gender-form"
            onSubmit={ form.handleSubmit(onSubmit) }
            className="space-y-4 py-4"
          >
            <FormField
              control={ form.control }
              name="gender"
              render={ ({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={ field.onChange } defaultValue={ field.value }>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer_not_to_say">I'd prefer not to say</SelectItem>
                      <SelectItem value="none">I don't know</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              ) }
            />
          </form>
        </Form>

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
            form="update-gender-form"
            disabled={ form.formState.isSubmitting }
          >
            { form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" /> }
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
