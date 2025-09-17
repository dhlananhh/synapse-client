"use client";


import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { format } from "date-fns";

import { authService } from "@/modules/services/auth-service";

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
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";

import {
  BrainCircuit,
  CalendarIcon,
  Loader2
} from "lucide-react";
import { cn } from "@/libs/utils";

const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);


const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string()
    .min(3, "Username must be at least 3 characters long.")
    .max(24, { message: "Username must be no longer than 24 characters." })
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
  confirmPassword: z.string(),
  birthday: z.date({
    required_error: "Your date of birth is required.",
  })
    .max(eighteenYearsAgo, { message: "You must be at least 18 years old to use Synapse." }),
  gender: z.enum([ "MALE", "FEMALE", "OTHER" ], {
    required_error: "Please select a gender."
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: [ "confirmPassword" ],
});


export default function RegisterForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      toast.info("Creating your account...");
      await authService.register(values);

      toast.success("Account created successfully!", {
        description: "We've sent a verification code to your email. Please check and verify.",
      });

      router.push(`/login?email=${values.email}`);

    } catch (error: any) {
      console.error("Registration failed:", error);
      toast.error("Registration failed", {
        description: error.response?.data?.message || "An unexpected error occurred. Please try again.",
      });
    }
  }


  return (
    <Card className="mx-auto max-w-lg w-full">
      <CardHeader className="items-center text-center">
        <Link
          href="/"
          className="flex flex-col items-center gap-2 mb-2"
        >
          <BrainCircuit className="h-10 w-10 text-primary" />
          <CardTitle className="text-2xl">
            Synapse
          </CardTitle>
        </Link>
        <CardDescription>
          Create your account to start connecting
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form
          { ...form }
        >
          <form
            onSubmit={ form.handleSubmit(onSubmit) }
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* First Name */ }
              <FormField
                control={ form.control }
                name="firstName"
                render={
                  ({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your first name"
                          { ...field }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }
              />

              {/* Last Name */ }
              <FormField
                control={ form.control }
                name="lastName"
                render={
                  ({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your last name"
                          { ...field }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }
              />
            </div>

            {/* Username */ }
            <FormField
              control={ form.control }
              name="username"
              render={
                ({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        { ...field }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }
            />

            {/* Email */ }
            <FormField
              control={ form.control }
              name="email" render={
                ({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        { ...field }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }
            />

            {/* Password */ }
            <FormField
              control={ form.control }
              name="password"
              render={
                ({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        { ...field }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }
            />

            {/* Confirm Password */ }
            <FormField
              control={ form.control }
              name="confirmPassword"
              render={ ({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Re-enter your password to confirm"
                      { ...field }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />

            {/* Date of Birth */ }
            <FormField
              control={ form.control }
              name="birthday"
              render={
                ({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Birth</FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={ "outline" }
                            className={
                              cn("w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )
                            }
                          >
                            {
                              field.value
                                ? format(field.value, "PPP")
                                : (
                                  <span>Select your date of birth</span>
                                )
                            }
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent
                        className="max-w-full max-h-full min-w-full min-h-full p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          captionLayout="dropdown"
                          selected={ field.value }
                          onSelect={ field.onChange }
                          disabled={ (date) => date > new Date() }
                          autoFocus
                          className="max-w-full max-h-full min-w-full min-h-full"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )
              }
            />

            {/* Gender */ }
            <FormField
              control={ form.control }
              name="gender"
              render={
                ({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={ field.onChange }
                      defaultValue={ field.value }
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select your gender"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="female">
                          Female
                        </SelectItem>
                        <SelectItem value="male">
                          Male
                        </SelectItem>
                        <SelectItem value="other">
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
                isSubmitting
                  ? <Loader2 className="animate-spin" />
                  : "Sign Up"
              }
            </Button>
          </form>
        </Form>

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
