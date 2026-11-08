import type {HistoricalMapRecord} from "./mapTypes";

/** No historical boundary data has been cleared for production yet. */
export const MAP_REGISTRY: HistoricalMapRecord[] = [
  {
    id: "MAP_PIPELINE_FIXTURE",
    title: "Synthetic map pipeline test geometry",
    file: "maps/fixtures/map-pipeline-fixture.geojson",
    historicalDate: null,
    sourceTitle: "Hand-authored synthetic QA fixture",
    sourceUrl: null,
    licence: "Project-authored test data",
    verificationStatus: "synthetic-fixture",
    outputAllowed: false,
    notes: "Not a map of Europe and not historical. Used only to test projection, path drawing, markers and frame-driven route reveals.",
  },
];
