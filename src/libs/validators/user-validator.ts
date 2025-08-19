import { z } from "zod";

export const UserProfileSchema = z.object({
  username: z.string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(24, { message: "Username must be no longer than 24 characters." })
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores."),
});

export type TUserProfileSchema = z.infer<typeof UserProfileSchema>;
