# Phase 2 QA report

**Status:** Source scaffold and dependency-free checks passed. Full package installation, TypeScript type resolution and browser render benchmarks remain unverified in this build environment because the npm registry was unreachable and `node_modules` was not installed.

## Passed checks

- All 11 TypeScript/TSX sources passed the TypeScript transpile/syntax pass using the globally available TypeScript compiler API.
- All `scripts/*.mjs` files passed `node --check`.
- `node scripts/check-project.mjs` passed: package versions are aligned; the five-feature fixture is explicitly synthetic/non-outputtable; only A06/A08 are included; excluded/held images are not present; the local narration excerpt exists.
- `npm run map:audit` passed the empty-intake path and reported that no production historical map geometry is present. This is expected and intentional in Phase 2.
- `npm run map:filter:clio:test` passed: inclusive date filtering, `POLITY` / `RELATION` separation and exact-name filtering.
- Static check found and removed one unused import in `AssetPipelinePreview.tsx`.

## Not passed / not run

- `npm install` / `npm ci`: not completed because this environment could not resolve/reach the npm registry.
- `npm run check`: not completed; `tsc` cannot resolve installed React/Node type packages until dependencies are installed.
- Remotion Studio browser launch and MP4 renders: not run; no installed dependency tree / Chromium render was available.
- Render throughput: no runtime numbers are claimed. Run the local benchmark twice after installation and retain `out/benchmark-results.json`.

## Important content boundary

The only map file shipped for the renderer is a five-feature synthetic fixture, permanently marked `outputAllowed: false`. Cliopatria is a licence-cleared CC BY 4.0 candidate for broad polity context, but its historical geometry has not yet been inspected or verified for any documentary map. See `MAP_DATA_SOURCE_REVIEW.md` and `docs/cliopatria_import_plan.md`.

The only archival files bundled are A06 and A08, both `reference-only`. The excluded Princip image and held Čabrinović image are absent. The local narration file is a 12-second excerpt for audio sync only, not the master narration.
