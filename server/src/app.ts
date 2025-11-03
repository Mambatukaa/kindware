import express from 'express';
import scanRoutes from './routes/scanRoutes';
import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';
import reportRoutes from './routes/reportRoutes';
import healthRoutes from './routes/healthRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', healthRoutes);
app.use('/api', scanRoutes);
app.use('/api', reportRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
