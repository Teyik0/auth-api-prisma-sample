import { NextFunction } from 'express';
import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { fetchSession } from '../controllers/auth.controller';

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401);
    throw new Error('🚫 Un-Authorized, you need a bearer token 🚫');
  }

  try {
    const token = authorization.split(' ')[1];
    await fetchSession(token);
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }

  return next();
}
