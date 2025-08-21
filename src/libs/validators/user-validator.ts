import { z } from "zod";

export const UserProfileSchema = z.object({
  username: z.string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(24, { message: "Username must be no longer than 24 characters." })
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores."),
});
export type TUserProfileSchema = z.infer<typeof UserProfileSchema>;


export const ChangeEmailSchema = z.object({
  newEmail: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required to confirm your identity."),
});
export type TChangeEmailSchema = z.infer<typeof ChangeEmailSchema>;


export const UpdateGenderSchema = z.object({
  gender: z.enum([ "male", "female", "other", "prefer_not_to_say", "none" ]),
});
export type TUpdateGenderSchema = z.infer<typeof UpdateGenderSchema>;


export const UpdateDisplayNameSchema = z.object({
  displayName: z.string().max(50, "Display name cannot exceed 50 characters.").optional(),
});
export type TUpdateDisplayNameSchema = z.infer<typeof UpdateDisplayNameSchema>;


export const UpdateDescriptionSchema = z.object({
  description: z.string().max(200, "Description cannot exceed 200 characters.").optional(),
});
export type TUpdateDescriptionSchema = z.infer<typeof UpdateDescriptionSchema>;
