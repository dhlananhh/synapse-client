"use client";


import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { Label } from "@/components/ui/label";
import { BrainCircuit } from "lucide-react";


export default function RegisterForm() {
  const router = useRouter();
  const { register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        firstName: data.firstName || "New",
        lastName: data.lastName || "User",
        email: data.email,
        password: data.password,
      }
      await apiClient.post("/register", payload);
      toast.success("Registration Successful!", {
        description: "A verification code has been sent to your email. Please verify to continue."
      });
      router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);

    } catch (error: any) {
      toast.error("Registration Failed", {
        description: error.response?.data?.message || "An unknown error occurred."
      });
    }
  };


  return (
    <Card className="mx-auto max-w-lg w-full">
      <CardHeader className="items-center justify-center">
        <Link
          href="/"
          className="flex flex-col items-center gap-2 mb-2"
        >
          <BrainCircuit className="h-10 w-10 text-primary" />
          <CardTitle className="text-2xl">Synapse</CardTitle>
        </Link>
        <CardDescription>
          Create your account to start connecting
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={ handleSubmit(onSubmit) }
          className="grid gap-4"
        >
          {/* First Name */ }
          <div className="grid gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              { ...register("firstName") }
              id="firstName"
              type="text"
              placeholder="Enter your first name"
            />
          </div>

          {/* Last Name */ }
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              { ...register("lastName") }
              id="lastName"
              type="text"
              placeholder="Enter your last name"
            />
          </div>

          {/* Email */ }
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              { ...register("email") }
              id="email"
              type="email"
              placeholder="Enter your email address"
            />
          </div>

          {/* Password */ }
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              { ...register("password") }
              id="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={ isSubmitting }
          >
            { isSubmitting ? "Registering..." : "Sign Up" }
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account? { " " }
          <Link
            href="/login"
            className="ml-auto inline-block text-sm text-muted-foreground hover:text-primary hover:underline"
          >
            Log in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
} 
