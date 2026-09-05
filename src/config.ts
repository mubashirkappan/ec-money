import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  PORT: z.coerce.number().default(3000), DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32), RAZORPAY_KEY_ID: z.string().min(1),
  RAZORPAY_KEY_SECRET: z.string().min(1), RAZORPAY_WEBHOOK_SECRET: z.string().min(1)
});
export const env = schema.parse(process.env);
