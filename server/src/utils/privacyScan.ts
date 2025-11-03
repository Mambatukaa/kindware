import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { getPrivacyGrade } from './scoring';

const trackerData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../lib/trackerData.json'), 'utf8'),
);

const trackerDomains = Array.isArray(trackerData)
  ? trackerData
  : Object.keys(trackerData);

export const runPrivacyScan = async (url: string) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const requests: string[] = [];
  page.on('request', (req) => requests.push(req.url()));

  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  const cookies = await page.cookies();

  console.log('cookies:', cookies);
  console.log('requests:', cookies);

  await browser.close();

  // Match trackers
  const detectedTrackers = requests.filter((req) =>
    trackerDomains.some((domain) => req.includes(domain)),
  );

  return {
    trackers: new Set(detectedTrackers.map((r) => new URL(r).hostname)).size,
    thirdPartyCookies: cookies.filter((c) => !url.includes(c.domain)).length,
    https: url.startsWith('https'),
    grade: getPrivacyGrade(
      detectedTrackers.length,
      cookies.length,
      url.startsWith('https'),
    ),
  };
};
