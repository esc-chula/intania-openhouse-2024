import { z } from "zod";

export const WorkshopSchema = z.object({
  department: z.string(),
  date: z.string(),
  time: z.string(),
  location: z.string(),
  users: z.optional(z.array(z.string())),
  maxUser: z.number(),
});

export const CancelWorksopSchema = z.object({
  workshopId: z.string(),
  userId: z.string(),
});
