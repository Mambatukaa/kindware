import express from 'express';
import { authenticate } from '../middlewares/auth';
import scanRoutes from './scanRoutes';
import reportRoutes from './reportRoutes';

const router = express.Router();

// Authenticate once for everything below
router.use(authenticate);

router.use(scanRoutes);
router.use(reportRoutes);

export default router;
