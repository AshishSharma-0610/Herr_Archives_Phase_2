export type MapVerificationStatus =
  | "synthetic-fixture"
  | "source-pending"
  | "needs-historical-verification"
  | "verified-for-production";

export type HistoricalMapRecord = {
  id: string;
  title: string;
  file: string;
  historicalDate: string | null;
  sourceTitle: string;
  sourceUrl: string | null;
  licence: string | null;
  verificationStatus: MapVerificationStatus;
  outputAllowed: boolean;
  notes: string;
};

export type LonLat = readonly [longitude: number, latitude: number];
