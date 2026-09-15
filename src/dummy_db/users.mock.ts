import { UserDetailsTypes } from "@/types/user.types";
import { customers } from "@/dummy_db/customers.mock"
import { adminDetails } from "@/dummy_db/admin.mock"

export const users: UserDetailsTypes[] = [
  {
    id: 1,
    user: adminDetails,
    userType: "admin",
    isActive: true,
  },
  {
    id: 2,
    user: customers[0],
    userType: "user",
    isActive: true,
  },
  {
    id: 3,
    user: customers[1],
    userType: "user",
    isActive: true,
  },
];