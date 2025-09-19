"use client";


import React, { useState } from "react";
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
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Verify Your Code</CardTitle>
        <CardDescription>Enter the 6-digit code sent to { email }.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form { ...form }>
          <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-6">
            <FormField
              control={ form.control }
              name="code"
              render={ ({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={ 6 } { ...field }>
                      <InputOTPGroup>
                        { [ ...Array(6) ].map((_, index) => (
                          <InputOTPSlot key={ index } index={ index } />
                        )) }
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />
            <Button type="submit" className="w-full" disabled={ isLoading }>
              { isLoading ? "Verifying..." : "Verify" }
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
