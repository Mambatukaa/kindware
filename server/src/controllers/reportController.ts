import { Request, Response, NextFunction } from 'express';
// import { Scan } from "../models/scan"; // later when DB is connected

export const getReportByUrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { url } = req.params;
    if (!url) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }

    // Step 1: fetch from DB (for now we’ll mock it)
    // const latestScan = await Scan.findOne({ where: { url }, order: [["createdAt", "DESC"]] });

    // Step 2: mock data for now
    const mockData = {
      url,
      privacy: { trackers: 17, cookies: 0, grade: 'C' },
      accessibility: { issues: 8, critical: 3, grade: 'D' },
      scannedAt: '2025-11-03T10:00:00Z',
    };

    // Step 3: respond
    res.status(200).json(mockData);
  } catch (error) {
    next(error);
  }
};
