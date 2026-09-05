export interface PayoutProvider { transfer(input: { payoutId: string; amountPaise: number; accountNumber: string; ifsc: string }): Promise<{ reference: string }>; }
// Replace this adapter with RazorpayX/your bank API after onboarding. It deliberately does not send money.
export const payoutProvider: PayoutProvider = { async transfer({ payoutId }) { return { reference: `mock_${payoutId}` }; } };
