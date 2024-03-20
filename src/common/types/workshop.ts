import { User } from "./user";

export type Workshop = {
  id: string;
  department: string;
  date: string;
  time: string;
  location: string;
  users: User[];
  maxUser: number;
};
