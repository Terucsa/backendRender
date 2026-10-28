import cors from 'cors';
import express from 'express';
import { errorHandler, notFoundHandler } from './middleware/errorHandlers';
import todosRouter from './routes/todos';

const app = express();

const rawOrigins = process.env.CLIENT_ORIGIN?.trim();
const corsOrigin =
  !rawOrigins || rawOrigins === '*'
    ? true
    : rawOrigins
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean);

app.use(cors({ origin: corsOrigin }));
app.use(express.json({ limit: '100kb' }));

app.get('/', (_req, res) => {
  res.json({
    name: 'API de tareas',
    status: 'ok',
    endpoints: {
      health: '/api/health',
      todos: '/api/todos',
    },
  });
});

app.get(['/health', '/api/health'], (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.use('/api/todos', todosRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
