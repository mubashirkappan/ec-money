export interface CustomerTypes {
  id: number;
  customerId: string;
  customerName: string;
  customerContact1: string;
  customerContact2?: string;
  addedAt: string;
  isActive: boolean;
}