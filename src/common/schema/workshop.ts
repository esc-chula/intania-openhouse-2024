import { z } from "zod";

export const WorkshopSchema = z.object({
  id: z.string(),
  department: z.string(),
  date: z.string(),
  time: z.string(),
  location: z.string(),
  users: z.array(z.string()),
  maxUser: z.number(),
});
