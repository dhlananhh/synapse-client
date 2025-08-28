import { z } from "zod";

export const TransferOwnershipSchema = z.object({
  newOwnerId: z.string().min(1, "You must select a new owner."),
  password: z.string().min(6, "Your password is required to confirm this action."),
});

export type TTransferOwnershipSchema = z.infer<typeof TransferOwnershipSchema>;
