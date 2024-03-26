import { Tour } from "./tour";
import { Workshop } from "./workshop";

export type User = {
  prefix: string;
  firstName: string;
  lastName: string;
  nickname: string;
  lineId: string;
  mobileNumber: string;
  email: string;
  guardianPhone: string;
  academicYear?: string;
  course?: string;
  school?: string;
  howFound?: string;
  workshops: string[];
  tours: string[];
};

export type UserReservation = {
  workshops: Workshop[];
  tours: Tour[];
};
