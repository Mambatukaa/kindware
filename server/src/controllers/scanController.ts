import { Request, Response, NextFunction } from 'express';

export const scanWebsite = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    // For MVP, mock data:
    const result = {
      url,
      privacy: { trackers: 17, cookies: 0, grade: 'C' },
      accessibility: { issues: 8, critical: 3, grade: 'D' },
    };

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
