"use client";


import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TForgotPasswordSchema,
  ForgotPasswordSchema
} from "@/libs/validators/user-validator";
import { requestPasswordReset } from "@/libs/mock-api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail,
  CheckCircle,
  Loader2
} from "lucide-react";


export default function ForgotPasswordForm() {
  const [ isSubmitted, setIsSubmitted ] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TForgotPasswordSchema>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = async (data: TForgotPasswordSchema) => {
    await requestPasswordReset(data.email);
    setIsSubmitted(true);
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
        <CardTitle className="text-2xl">
          Forgot Password
        </CardTitle>
        <CardDescription>
          Enter your email and we"ll send you a link to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={ handleSubmit(onSubmit) }
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              { ...register("email") }
            />
            {
              errors.email && (
                <p className="text-sm text-destructive">
                  { errors.email.message }
                </p>
              )
            }
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={ isSubmitting }
          >
            {
              isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )
            }
            Send Reset Link
          </Button>
        </form>
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
