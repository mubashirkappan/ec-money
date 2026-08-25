import { UserTypes } from "./user.types";

export interface LoginTypes {
  id: number;
  userId: UserTypes;
  password: string;
}