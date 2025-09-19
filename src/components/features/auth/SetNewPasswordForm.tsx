"use client";


import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { authService } from "@/modules/services/auth-service";
import {
  BrainCircuit,
  Loader2
} from "lucide-react";


const formSchema = z.object({
  new_password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});


interface SetNewPasswordFormProps {
  reset_token: string;
}


export default function SetNewPasswordForm({ reset_token }: SetNewPasswordFormProps) {
  const [ isLoading, setIsLoading ] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { new_password: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await authService.setNewPassword({ reset_token, new_password: values.new_password });
      toast.success("Password updated successfully!", {
        description: "You can now log in with your new password."
      });
      router.push("/login");
    } catch (error: any) {
      toast.error("Failed to update password", {
        description: error.response?.data?.message || "The session may have expired. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-lg w-full">
      <CardHeader className="items-center text-center">
        <Link
          href="/"
          className="flex flex-col items-center gap-2 mb-4"
        >
          <BrainCircuit className="h-10 w-10 text-primary" />
          <CardTitle className="text-2xl">Synapse</CardTitle>
        </Link>

        <CardTitle className="text-2xl mt-5 uppercase">
          Set New Password
        </CardTitle>
        <CardDescription>
          Enter your new password below.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form
          { ...form }
        >
          <form
            onSubmit={ form.handleSubmit(onSubmit) }
            className="space-y-4"
          >
            <FormField
              control={ form.control }
              name="new_password"
              render={
                ({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        { ...field }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }
            />

            <Button
              type="submit"
              className="w-full"
              disabled={ isLoading }
            >

              {
                isLoading
                  ? <Loader2 className="animate-spin" />
                  : "Set New Password"
              }
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
