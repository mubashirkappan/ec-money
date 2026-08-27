import { UserDetailsTypes } from "./user.types";

export interface LoginTypes {
  id: number;
  userId: UserDetailsTypes;
  password: string;
}