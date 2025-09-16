"use client";


import React from "react";
import Link from "next/link";
import {
  useRouter,
  useSearchParams
} from "next/navigation";
import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { BrainCircuit } from "lucide-react";


export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await apiClient.post(
        "/verify-email",
        { email, code: data.code }
      );
      toast.success("Email Verified!", {
        description: "You can now log in to your account."
      });
      router.push("/login");
    } catch (error: any) {
      toast.error("Verification Failed", {
        description: error.response?.data?.message || "Invalid or expired code."
      });
    }
  };

  return (
    <Card className="mx-auto max-w-lg w-full">
      <CardHeader className="items-center">
        <Link
          href="/"
          className="flex flex-col items-center gap-2 mb-2"
        >
          <BrainCircuit className="h-10 w-10 text-primary" />
          <CardTitle className="text-2xl">Synapse</CardTitle>
        </Link>
        <CardTitle className="uppercase">Verify Your Email</CardTitle>
        <CardDescription>
          A 6-digit verification code has been sent to { " " }
          <strong>{ email }</strong>. { " " }
          Please enter it below.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={ handleSubmit(onSubmit) }
          className="space-y-4"
        >
          <Input
            { ...register("code") }
            maxLength={ 6 }
            placeholder="123456"
          />
          <Button
            type="submit"
            className="w-full"
            disabled={ isSubmitting }
          >
            { isSubmitting ? "Verifying..." : "Verify" }
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
