import express from 'express';
import { scanWebsite } from '../controllers/scanController';
import validateUrl from '../middlewares/validateUrl';

const router = express.Router();

router.post('/scan', validateUrl, scanWebsite);

export default router;
