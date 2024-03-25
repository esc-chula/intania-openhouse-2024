import { z } from "zod";

export const UserSchema = z.object({
  prefix: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  nickname: z.string(),
  lineId: z.string(),
  mobileNumber: z.string(),
  email: z.string().email(),
  guardianPhone: z.string(),
  academicYear: z.optional(z.string()),
  course: z.optional(z.string()),
  school: z.optional(z.string()),
  howFound: z.optional(z.string()),
  workshops: z.optional(z.array(z.string())),
  tours: z.optional(z.array(z.string())),
});
