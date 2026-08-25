export interface PaymentTypes {
  id: number;
  accountHolderName: string;
  accountNumber: string;
  bankName: string;
  ifscCode: string;
}

export interface PaymentData {
  accountNumber: string;
  confirmAccountNumber: string;
  ifscCode: string;
  bankName: string;
  holderName: string;
  amount: number;
  pin: string;
};