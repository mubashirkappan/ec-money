import express,{ Router } from 'express'; import { auth } from '../auth.js'; import { createOrder,razorpayWebhook } from '../controllers/funding.controller.js';
export const fundingRouter=Router(); fundingRouter.post('/orders',auth(['OWNER']),createOrder); export const webhookRouter=Router(); webhookRouter.post('/razorpay',express.raw({type:'application/json'}),razorpayWebhook);
