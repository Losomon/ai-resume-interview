import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './config/env';
import { pool } from './db';
import { errorHandler, notFound } from './middleware/error';
import { authRouter } from './modules/auth.routes';
import { usersRouter, settingsRouter } from './modules/users.routes';
import { resumesRouter } from './modules/resumes.routes';
import { atsRouter } from './modules/ats.routes';
import { applicationsRouter } from './modules/applications.routes';
import { dashboardRouter } from './modules/dashboard.routes';
import { contactRouter } from './modules/contact.routes';

export const app = express();

app.use(helmet());
// credentials:true requires an explicit origin, never '*'
app.use(cors({ origin: env.CORS_ORIGIN.split(','), credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

app.get('/health', (_req, res) => { res.json({ ok: true }); });
app.get('/health/ready', async (_req, res) => {
  try { await pool.query('select 1'); res.json({ ok: true }); }
  catch { res.status(503).json({ ok: false }); }
});

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/resumes', resumesRouter);
app.use('/api/ats', atsRouter);
app.use('/api/applications', applicationsRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/contact', contactRouter);

app.use(notFound);
app.use(errorHandler);
