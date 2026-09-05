import { Router } from 'express'; import { createShop } from '../controllers/auth.controller.js'; import { auth } from '../auth.js';
export const shopRouter=Router(); shopRouter.post('/',auth(['OWNER']),createShop);
