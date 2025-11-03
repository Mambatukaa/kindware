export interface Report {
  id: number;
  url: string;
  privacy: {
    trackers: number;
    cookies: number;
    grade: string;
  };
  accessibility: {
    issues: number;
    critical: number;
    grade: string;
  };
  scannedAt: string;
}

export let reports: Report[] = [];
