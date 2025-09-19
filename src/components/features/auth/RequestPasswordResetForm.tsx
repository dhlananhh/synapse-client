"use client";


import React, { useState } from "react";
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


const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});


interface RequestPasswordResetFormProps {
  onSuccess: (email: string) => void;
}


export default function RequestPasswordResetForm({ onSuccess }: RequestPasswordResetFormProps) {
  const [ isLoading, setIsLoading ] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await authService.requestPasswordReset(values);
      toast.success("Password reset code sent!", {
        description: `Check your inbox at ${values.email}.`
      });
      onSuccess(values.email);
    } catch (error: any) {
      toast.error("Failed to send code", {
        description: error.response?.data?.message || "Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          Reset Password
        </CardTitle>
        <CardDescription>
          Enter your email to receive a password reset code.
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
              name="email"
              render={
                ({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
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
                isLoading ? "Sending..." : "Send Reset Code"
              }
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
