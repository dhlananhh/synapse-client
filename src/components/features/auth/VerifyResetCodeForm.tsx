"use client";


import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/components/ui/input-otp";
import { authService } from "@/modules/services/auth-service";
import {
  BrainCircuit,
  Loader2
} from "lucide-react";


const formSchema = z.object({
  code: z.string().min(6, { message: "Your one-time code must be 6 characters." }),
});

interface VerifyResetCodeFormProps {
  email: string;
  onSuccess: (resetToken: string) => void;
}

export default function VerifyResetCodeForm({ email, onSuccess }: VerifyResetCodeFormProps) {
  const [ isLoading, setIsLoading ] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { code: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const response = await authService.verifyPasswordResetCode({ email, code: values.code });
      toast.success("Code verified successfully!");
      onSuccess(response.reset_token);
    } catch (error: any) {
      toast.error("Verification failed", { description: error.response?.data?.message || "Invalid or expired code." });
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
          Verify Your Code
        </CardTitle>
        <CardDescription>
          We&apos;ve sent a 6-digit verification code to { " " }
          <strong>{ email }</strong>. <br />
          Please enter it below to reset your password.
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
              name="code"
              render={
                ({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <InputOTP
                        maxLength={ 6 }
                        { ...field }
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={ 0 } />
                          <InputOTPSlot index={ 1 } />
                          <InputOTPSlot index={ 2 } />
                          <InputOTPSlot index={ 3 } />
                          <InputOTPSlot index={ 4 } />
                          <InputOTPSlot index={ 5 } />
                        </InputOTPGroup>
                      </InputOTP>
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
                  : "Verify"
              }
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
