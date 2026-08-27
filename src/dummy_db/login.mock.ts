import { LoginTypes } from "@/types/login.types"
import { users } from "./users.mock"

export const loginData: LoginTypes[] = [
  {
    id: 1,
    userId: users[0],
    password: "123456",
  },
  {
    id: 2,
    userId: users[1],
    password: "246824",
  },
  {
    id: 3,
    userId: users[2],
    password: "135796",
  },
]