import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});
export type TLoginSchema = z.infer<typeof LoginSchema>;


export const RegisterSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long."),
  displayName: z.string().min(3, "Display name must be at least 3 characters long."),
  email: z.string().email("Please enter a valid email address."),
  gender: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters long."),
  confirmPassword: z.string()
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: [ "confirmPassword" ],
  });

export type TRegisterSchema = z.infer<typeof RegisterSchema>;


export const VerifyCodeSchema = z.object({
  code: z.string().min(6, { message: "Your code must be 6 digits." }),
});
export type TVerifyCodeSchema = z.infer<typeof VerifyCodeSchema>;
