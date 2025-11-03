import express from 'express';
import { getReportByUrl } from '../controllers/reportController';

const router = express.Router();

router.get('/report/:url', getReportByUrl);

export default router;
