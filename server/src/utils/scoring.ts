/**
 * utils/scoring.ts
 *
 * Centralized grading logic for Kindware scans.
 *
 * Returns letter grades (A–F) based on the number of issues or trackers found.
 * Used by both privacyScan.ts and accessibilityScan.ts
 */

/**
 * Get grade for privacy scan.
 * Based on tracker count, 3rd-party cookies, and HTTPS usage.
 */
export function getPrivacyGrade(
  trackers: number,
  cookies: number,
  https: boolean,
): string {
  if (!https) return 'F'; // insecure site = auto fail

  if (trackers <= 5 && cookies <= 1) return 'A';
  if (trackers <= 10 && cookies <= 3) return 'B';
  if (trackers <= 20 && cookies <= 5) return 'C';
  if (trackers <= 40) return 'D';
  return 'F';
}

/**
 * Get grade for accessibility scan.
 * Based on counts of critical and serious issues from axe-core.
 */
export function getAccessibilityGrade(
  critical: number,
  serious: number,
): string {
  if (critical === 0 && serious <= 3) return 'A';
  if (critical <= 2 && serious <= 6) return 'B';
  if (critical <= 5 && serious <= 10) return 'C';
  if (critical <= 10 || serious <= 20) return 'D';
  return 'F';
}

/**
 * Optional: Convert numeric score (0–100) to a letter grade.
 * Can be reused later if you add scoring weights.
 */
export function scoreToGrade(score: number): string {
  if (score >= 90) return 'A';
  if (score >= 75) return 'B';
  if (score >= 60) return 'C';
  if (score >= 40) return 'D';
  return 'F';
}
