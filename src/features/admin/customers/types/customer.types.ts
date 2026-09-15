type proofTypes = "Aadhaar" | "Passport" | "Driving License"

export interface CustomerTypes {
  id: number;
  customerId: string;
  profileImg?: string;
  customerName: string;
  orgName: string,
  email: string,
  contact1: string;
  contact2?: string;
  dateOfBirth: string,
  personalAddress?: string,
  orgAddress?: string,
  proofType: proofTypes;
  proofID: string;
  proofDocument: string;
  addedAt: string;
  isActive: boolean;
}