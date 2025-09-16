"use client";


import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";

import apiClient from "@/libs/api";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  BrainCircuit,
  Loader2
} from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const VerifyCodeSchema = z.object({
  code: z.string().min(6, { message: "Your code must be 6 digits." }),
});
type TVerifyCodeSchema = z.infer<typeof VerifyCodeSchema>;


export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [ isResending, setIsResending ] = useState(false);

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<TVerifyCodeSchema>({
    resolver: zodResolver(VerifyCodeSchema)
  });

  const onSubmit = async (data: TVerifyCodeSchema) => {
    try {
      await apiClient.post("/verify-email", { email, code: data.code });
      toast.success("Email Verified!", {
        description: "Your account is now active. You can log in.",
      });
      router.push("/login");
    } catch (error: any) {
      toast.error("Verification Failed", {
        description: error.response?.data?.message || "Invalid or expired code.",
      });
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    try {
      await apiClient.post("/resend-verification", { email });
      toast.info("A new verification code has been sent to your email.");
    } catch (error: any) {
      toast.error("Failed to Resend Code", {
        description: error.response?.data?.message || "Please try again in a moment.",
      });
    } finally {
      setIsResending(false);
    }
  }

  return (
    <Card className="mx-auto max-w-lg w-full">
      <CardHeader className="items-center text-center">
        <Link
          href="/"
          className="flex flex-col items-center gap-2 mb-4"
        >
          <BrainCircuit className="h-10 w-10 text-primary" />
        </Link>

        <CardTitle className="text-2xl">Verify Your Email</CardTitle>
        <CardDescription>
          We"ve sent a 6-digit verification code to <br />
          <strong>{ email }</strong>. Please enter it below to activate your account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={ handleSubmit(onSubmit) }
          className="space-y-6"
        >
          <div className="flex justify-center">
            <Controller
              control={ control }
              name="code"
              render={ ({ field }) => (
                <InputOTP maxLength={ 6 } { ...field }>
                  <InputOTPGroup>
                    <InputOTPSlot index={ 0 } />
                    <InputOTPSlot index={ 1 } />
                    <InputOTPSlot index={ 2 } />
                    <InputOTPSlot index={ 3 } />
                    <InputOTPSlot index={ 4 } />
                    <InputOTPSlot index={ 5 } />
                  </InputOTPGroup>
                </InputOTP>
              ) }
            />
          </div>

          {
            errors.code && (
              <p className="text-center text-sm text-destructive">
                { errors.code.message }
              </p>
            )
          }

          <Button
            type="submit"
            className="w-full"
            disabled={ isSubmitting }
          >
            {
              isSubmitting
                ? <Loader2 className="animate-spin" />
                : "Verify Account"
            }
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          Didn"t receive a code? { " " }
          <Button
            variant="link"
            className="p-0 h-auto"
            onClick={ handleResendCode }
            disabled={ isResending }
          >
            { isResending ? "Sending..." : "Resend Code" }
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
