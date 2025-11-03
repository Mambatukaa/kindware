import puppeteer from 'puppeteer';
import { AxePuppeteer } from '@axe-core/puppeteer';
import { getAccessibilityGrade } from './scoring';

export const runAccessibilityScan = async (url: string) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  const results = await new AxePuppeteer(page).analyze();

  await browser.close();

  // Summarize by severity
  const issues = results.violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    description: v.description,
    nodes: v.nodes.length,
  }));

  const critical = issues.filter((i) => i.impact === 'critical').length;
  const serious = issues.filter((i) => i.impact === 'serious').length;

  return {
    totalIssues: results.violations.length,
    critical,
    serious,
    issues,
    grade: getAccessibilityGrade(critical, serious),
  };
};
