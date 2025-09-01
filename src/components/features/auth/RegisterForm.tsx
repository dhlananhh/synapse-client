"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRegisterSchema, RegisterSchema } from "@/libs/validators/auth-validator";
import { useAuth } from "@/context/AuthContext";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrainCircuit, Loader2 } from "lucide-react";

export default function RegisterForm() {
  const { register: authRegister } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: TRegisterSchema) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    authRegister(data);

    router.push("/");
  };

  return (
    <Card className="mx-auto max-w-lg w-full">
      <CardHeader className="items-center justify-center">
        <Link href="/" className="flex flex-col items-center gap-2 mb-2">
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
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              { ...register("username") }
              id="username"
              type="text"
              placeholder="Enter your username"
            />
            {
              errors.username && (
                <p className="text-xs text-destructive">
                  { errors.username.message }
                </p>
              )
            }
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              { ...register("email") }
              id="email"
              type="email"
              placeholder="Enter your email address"
            />
            {
              errors.email && (
                <p className="text-xs text-destructive">{ errors.email.message }</p>
              )
            }
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              { ...register("password") }
              id="password"
              type="password"
            />
            {
              errors.password && (
                <p className="text-xs text-destructive">
                  { errors.password.message }
                </p>
              )
            }
          </div>

          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              { ...register("confirmPassword") }
              id="confirmPassword"
              type="password"
            />
            {
              errors.confirmPassword && (
                <p className="text-xs text-destructive">
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
            { isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" /> }
            Create an account
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
