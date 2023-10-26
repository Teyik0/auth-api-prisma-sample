import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';

import authRouter from './routes/auth.router';

export const prisma = new PrismaClient();

export const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
