"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TLoginSchema, LoginSchema } from "@/libs/validators/auth-validator";
import { useAuth } from "@/context/AuthContext";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrainCircuit, Loader2 } from "lucide-react";


export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: TLoginSchema) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    login(data.username);
    router.push("/");
  };

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader className="items-center">
        <Link href="/" className="flex flex-col items-center gap-2 mb-2">
          <BrainCircuit className="h-10 w-10 text-primary" />
          <CardTitle className="text-2xl">Synapse</CardTitle>
        </Link>
        <CardDescription>
          Enter your username below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={ handleSubmit(onSubmit) } className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              { ...register("username") }
              id="username"
              type="text"
              placeholder="john_doe"
            />
            { errors.username && <p className="text-xs text-destructive">{ errors.username.message }</p> }
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input { ...register("password") } id="password" type="password" />
            { errors.password && <p className="text-xs text-destructive">{ errors.password.message }</p> }
          </div>
          <Button type="submit" className="w-full" disabled={ isSubmitting }>
            { isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" /> }
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{ " " }
          <Link href="/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
