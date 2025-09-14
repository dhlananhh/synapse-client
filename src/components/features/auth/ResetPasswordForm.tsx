"use client";


import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TResetPasswordSchema,
  ResetPasswordSchema
} from "@/libs/validators/user-validator";
import { resetPassword } from "@/libs/api";
import { toast } from "sonner";
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
import { Loader2 } from "lucide-react";


interface ResetPasswordFormProps {
  params: {
    token: string;
  }
}


export default function ResetPasswordForm({ params }: ResetPasswordFormProps) {
  const router = useRouter();

  const token = params.token;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit = async (data: TResetPasswordSchema) => {
    try {
      await resetPassword(token, data.password);
      toast.success("Password Reset Successfully!", {
        description: "You can now log in with your new password.",
      });
      router.push("/login");
    } catch (error) {
      toast.error("Failed to Reset Password", {
        description: "The reset link may have expired or is invalid. Please try again.",
      });
    }
  };

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-2xl">
          Set a new password
        </CardTitle>
        <CardDescription>
          Please enter a new, strong password for your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={ handleSubmit(onSubmit) }
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              { ...register("password") }
              placeholder="Enter your new password"
            />
            {
              errors.password && (
                <p className="text-sm text-destructive">
                  { errors.password.message }
                </p>
              )
            }
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              { ...register("confirmPassword") }
              placeholder="Re-enter your new password to confirm"
            />
            {
              errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  { errors.confirmPassword.message }
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
            Reset Password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
