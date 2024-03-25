import { z } from "zod";

export const TourSchema = z.object({
  date: z.string(),
  time: z.string(),
  users: z.optional(z.array(z.string())),
  maxUser: z.number(),
});

export const CancelTourSchema = z.object({
  tourId: z.string(),
  userId: z.string(),
});