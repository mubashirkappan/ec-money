import { Router } from 'express'; import { auth } from '../auth.js'; import { allocate,getWallet } from '../controllers/wallet.controller.js';
export const walletRouter=Router(); walletRouter.get('/',auth(),getWallet); walletRouter.post('/allocate',auth(['OWNER']),allocate);
