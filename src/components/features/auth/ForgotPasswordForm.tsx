"use client";


import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { authService } from "@/modules/services/auth-service";
import {
  ForgotPasswordSchema,
  TForgotPasswordSchema
} from "@/libs/validators/auth-validator";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Mail,
  CheckCircle,
  Loader2
} from "lucide-react";


export default function ForgotPasswordForm() {
  const router = useRouter();
  const [ isSubmitted, setIsSubmitted ] = useState(false);
  const [ submittedEmail, setSubmittedEmail ] = useState("");

  const form = useForm<TForgotPasswordSchema>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: TForgotPasswordSchema) => {
    try {
      toast.info("Sending reset code...");
      await authService.requestPasswordReset(data);

      toast.success("Reset code sent!", {
        description: "If an account exists for this email, we have sent a 6-digit code."
      });
      setSubmittedEmail(data.email);
      setIsSubmitted(true);
      router.push(`/reset-password?email=${data.email}`);
    } catch (error: any) {
      console.error("Failed to send reset code:", error);
      toast.error("An Error Occurred", {
        description: error.response?.data?.message || "Please try again later.",
      });
    }
  };


  if (isSubmitted) {
    return (
      <Card className="mx-auto max-w-lg w-full text-center">
        <CardHeader>
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
          <CardTitle>
            Check your email
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            If an account with that email exists, we"ve sent a link to reset your password.
          </p>
          <Button
            asChild
            variant="secondary"
            className="mt-6"
          >
            <Link href="/login">
              Back to Login
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription>
          No worries. Enter your email and we'll send you a reset code.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form
          { ...form }
        >
          <form
            onSubmit={ form.handleSubmit(onSubmit) }
            className="space-y-6"
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
                        type="email"
                        placeholder="Enter your email address"
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
              disabled={ isSubmitting }
            >
              {
                isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              }
              Send Reset Code
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Remembered your password? { " " }
          <Link
            href="/login"
            className="underline"
          >
            Log in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
