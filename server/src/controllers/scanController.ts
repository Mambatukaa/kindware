import { Request, Response, NextFunction } from 'express';
import { runAccessibilityScan } from '../utils/accessibilityScan';
import { runPrivacyScan } from '../utils/privacyScan';
import { prisma } from '../lib/prisma';

export const scanWebsite = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    const [accessibility, privacy] = await Promise.all([
      runAccessibilityScan(url),
      runPrivacyScan(url),
    ]);

    const result = {
      url,
      accessibility,
      privacy,
    };

    const site = await prisma.site.upsert({
      where: { url },
      update: {},
      create: { url },
    });

    await prisma.scan.create({
      data: {
        siteId: site.id,
        privacyTrackers: privacy.trackers,
        thirdPartyCookies: privacy.thirdPartyCookies,
        privacyGrade: privacy.grade,
        accessibilityIssues: accessibility.issues.length,
        accessibilityCritical: accessibility.critical,
        accessibilityGrade: accessibility.grade,
        https: privacy.https,
      },
    });

    return res.status(200).json({
      message: 'Scan completed successfully',
      result,
    });
  } catch (err) {
    next(err);
  }
};
