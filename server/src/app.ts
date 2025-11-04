import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import healthRoutes from './routes/healthRoutes';
import authRoutes from './routes/authRoutes';
import secureRoutes from './routes/secureRoutes';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true, // allow cookies
  }),
);

app.use('/api', healthRoutes);
// public Routes
app.use('/api', authRoutes);

// secure Routes
app.use('/api', secureRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
