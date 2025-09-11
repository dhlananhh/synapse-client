import { z } from "zod";


export const TransferOwnershipSchema = z.object({
  newOwnerId: z.string().min(1, "You must select a new owner."),
  password: z.string().min(6, "Your password is required to confirm this action."),
});

export type TTransferOwnershipSchema = z.infer<typeof TransferOwnershipSchema>;


export const CreateCommunitySchema = z.object({
  name: z.string()
    .min(3, {
      message: "Community name must be at least 3 characters long."
    })
    .max(50, {
      message: "Community name cannot exceed 50 characters."
    }),
  slug: z.string()
    .min(3, {
      message: "URL slug must be at least 3 characters long."
    })
    .max(30, {
      message: "URL slug cannot exceed 30 characters."
    })
    .regex(/^[a-z0-9_]+$/, {
      message: "URL slug can only contain lowercase letters, numbers, and underscores."
    }),
  description: z.string()
    .max(250, {
      message: "Description cannot exceed 250 characters."
    })
    .optional(),
});

export type TCreateCommunitySchema = z.infer<typeof CreateCommunitySchema>;
