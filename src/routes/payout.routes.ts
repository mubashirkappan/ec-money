import { Router } from 'express'; import { auth } from '../auth.js'; import { createPayout } from '../controllers/payout.controller.js';
export const payoutRouter=Router(); payoutRouter.post('/',auth(['SHOP']),createPayout);
