import { Router } from 'express'; import { login, registerOwner } from '../controllers/auth.controller.js';
export const authRouter=Router(); authRouter.post('/register-owner',registerOwner); authRouter.post('/login',login);
