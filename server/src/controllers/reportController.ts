import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
// import { Scan } from "../models/scan"; // later when DB is connected

export const getReport = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const url = req.query.url as string;

    if (!url) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }

    const site = await prisma.site.findUnique({
      where: { url },
    });

    if (!site) {
      return res.status(404).json({ error: 'Site not found' });
    }

    const scan = await prisma.scan.findFirst({
      where: { siteId: site.id },
    });

    if (!scan) {
      return res.status(404).json({ error: 'Scan not found' });
    }

    res.status(200).json({
      url,
      privacy: {
        trackers: scan.privacyTrackers,
        cookies: scan.thirdPartyCookies,
        grade: scan.privacyGrade,
      },
      accessibility: {
        issues: scan.accessibilityIssues,
        critical: scan.accessibilityCritical,
        grade: scan.accessibilityGrade,
      },
      scannedAt: scan.createdAt,
    });
  } catch (error) {
    next(error);
  }
};
