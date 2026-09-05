import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'; import { env } from './config.js';
export type Role = 'OWNER' | 'SHOP';
export type AuthRequest = Request & { user?: { id: string; role: Role } };
export function auth(roles?: Role[]) { return (req: AuthRequest, res: Response, next: NextFunction) => {
 const token = req.header('authorization')?.replace(/^Bearer\s+/i, ''); if (!token) return res.status(401).json({ error: 'Authentication required' });
 try { const user = jwt.verify(token, env.JWT_SECRET) as { sub: string; role: Role }; if (roles && !roles.includes(user.role)) return res.status(403).json({ error: 'Insufficient permissions' }); req.user = { id: user.sub, role: user.role }; next(); } catch { return res.status(401).json({ error: 'Invalid token' }); }
}; }
