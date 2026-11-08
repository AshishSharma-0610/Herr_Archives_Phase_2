import {staticFile} from "remotion";

export type ArchivalAsset = {
  id: string;
  label: string;
  file: string;
  src: string;
  status: "reference-only" | "approved-for-context" | "hold" | "excluded";
  recommendedUse: string;
  captionStatus: string;
  rightsStatus: string;
};

/**
 * Phase 2 deliberately bundles only two useful archive references.
 * This registry is metadata-first; inclusion does not grant publication rights.
 */
export const ARCHIVAL_ASSETS: ArchivalAsset[] = [
  {
    id: "A06",
    label: "Franz Ferdinand and Sophie with Graf & Stift motorcar",
    file: "assets/archival/A06_Franz_Ferdinand_Sophie_Graf_Stift_1914.jpeg",
    src: staticFile("assets/archival/A06_Franz_Ferdinand_Sophie_Graf_Stift_1914.jpeg"),
    status: "reference-only",
    recommendedUse: "Vehicle, seating and costume reference; possible archival insert after provenance review.",
    captionStatus: "Supplied caption and date require independent verification.",
    rightsStatus: "Rights not supplied or assessed.",
  },
  {
    id: "A08",
    label: "Appel Quay along the Miljacka River, Sarajevo",
    file: "assets/archival/A08_Appel_Quay_Sarajevo_1914.png",
    src: staticFile("assets/archival/A08_Appel_Quay_Sarajevo_1914.png"),
    status: "reference-only",
    recommendedUse: "Location and architectural reference for an original reconstruction.",
    captionStatus: "Exact date, viewpoint and source provenance require verification.",
    rightsStatus: "Rights not supplied or assessed.",
  },
];
