import { CustomerTypes } from "@/features/admin/customers/types/customer.types"
import { adminTypes } from "@/types/admin.types"

type userTypes = "admin" | "user"

export interface UserDetailsTypes {
  id: number;
  user: CustomerTypes | adminTypes;
  userType: userTypes;
  isActive: boolean,
}