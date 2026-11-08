# Archival asset pipeline

## Principle

The archive is an evidence library, not a checklist. Include an image only when it adds provenance, recognisable evidence, useful architectural/costume reference or meaningful contrast with an illustrated reconstruction.

## Current Phase 2 sample assets

- A06 — Franz Ferdinand / Sophie / Graf & Stift car: bundled as a local reference image, with caption and rights review still pending.
- A08 — Appel Quay / Miljacka: bundled as a local location reference, with exact date/viewpoint and rights review still pending.

No production scene automatically inserts either image. The `src/assets/assetRegistry.ts` entry carries recommendation, caption status and rights status with the static file path.

## Excluded / held images

- The Princip-labelled mugshot remains excluded by user instruction and is not copied into this project.
- The Čabrinović arrest image is held pending attribution verification and is not copied into this project.

## Intake checklist

1. Preserve the original file unchanged.
2. Store a stable asset ID, original filename, source, licence / rights status, supplied caption, verification status and intended story use.
3. Store media locally under `public/assets/`.
4. Reference media through the central asset registry, not hard-coded arbitrary paths in scenes.
5. Keep the photograph authentic; do not generate, erase or add photographic details.
6. Use captions only when identity/date/context are verified.
