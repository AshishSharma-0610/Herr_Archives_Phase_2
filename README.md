# Herr Archives — World War One | Phase 2 Foundation

**Status:** Phase 2 technical scaffold. This is not the final documentary, not the final Sarajevo proof, and not a set of production illustrations.

## What Phase 2 delivers

- A native Remotion + React + TypeScript project foundation.
- An atlas map component built with React Simple Maps, D3 Geo and TopoJSON Client.
- Local-only map data intake, metadata and audit utilities.
- A metadata-first archival asset registry with two selectively included reference images.
- A Remotion media/audio sync benchmark using a 12-second excerpt of the supplied narration.
- Architecture, map and archival asset pipeline benchmark compositions.
- Local rendering benchmark scripts and verification checks.

## Deliberate limitation

The only included map geometry is synthetic test data, visibly watermarked as not historical. Phase 1's eight map requirements are not yet backed by verified geometry. Do not use the fixture in a documentary render. No character rigs, final environments or documentary scenes are included; those are later phases.

## Requirements

- Node.js >= 22.12.0
- npm 10 or later recommended
- Internet access for first dependency installation
- Enough disk space for browser binaries and benchmark MP4s

## Install and validate

```bash
npm install
npm run check
npm run map:audit
npm run map:filter:clio:test
```

This handoff does not include a generated `package-lock.json` because dependency installation could not reach the npm registry in the build environment. The first `npm install` will create it; keep that lockfile with the project and use `npm ci` for subsequent clean installs. All direct dependencies are exact-pinned in `package.json`.

## Open Remotion Studio

```bash
npm run dev
```

Select one of:

- `Phase2ArchitectureOverview`
- `Phase2AssetPipelinePreview`
- `Phase2AudioSyncBenchmark`
- `Phase2MapBenchmark720`
- `Phase2MapBenchmark1080`

## Render technical benchmarks

```bash
npm run render:map:720
npm run render:map:1080
npm run render:assets
npm run render:audio
```

Run both map renders and save timing results:

```bash
npm run benchmark
```

Outputs are written under `out/`. Benchmark instructions are in `docs/benchmark_protocol.md`.

## Map data tools

Audit local historical map intake:

```bash
npm run map:audit
```

Filter a downloaded Cliopatria GeoJSON snapshot to the polity polygons whose date interval includes 1914:

```bash
npm run map:filter:clio -- --input data/cliopatria.geojson --output public/maps/historical/cliopatria-polities-1914.geojson --year 1914 --type POLITY
```

The filter treats `FromYear` and `ToYear` as inclusive and excludes `RELATION` rows when `--type POLITY` is selected. It does not prove historical accuracy. The dataset is licensed CC BY 4.0 by its repository `LICENSE.md`; preserve attribution, release tag/commit and licence information. See `docs/cliopatria_import_plan.md` before import.

Convert a reviewed TopoJSON object into GeoJSON (replace paths and object name with your source's actual values):

```bash
npm run map:convert -- --input public/maps/source/example.topojson --object countries --output public/maps/historical/example.geojson --date 1914 --source-title "Source title" --source-url "https://example.org/dataset" --licence "Dataset licence"
```

Conversion does not establish historical accuracy. Human source review remains mandatory.

## Project references

- `TECH_STACK.md` — exact package plan and responsibilities.
- `MAP_DATA_SOURCE_REVIEW.md` — candidate historical map data, licensing and suitability review.
- `PHASE2_QA_REPORT.md` — checks that passed and what still requires local installation/render validation.
- `ARCHITECTURE_DECISIONS.md` — accepted technical decisions.
- `docs/historical_map_data_policy.md` — historical geography integrity rules.
- `docs/cliopatria_import_plan.md` — licensed historical polity candidate, year filter, attribution and validation steps.
- `docs/asset_pipeline.md` — archive handling policy.
- `docs/benchmark_protocol.md` — local render tests.
- `reference/phase0/` — approved visual identity bible and palette.
- `reference/phase1/` — 113-shot plan, asset manifest, narration alignment and map requirements.

## Licensing note

Remotion has a special licence; a company licence may be required depending on company size and usage. Check current official terms before commercial production. React Simple Maps is MIT-licensed; d3-geo is ISC; TopoJSON Client is ISC. This README is not legal advice.

## Historical map source research

See `MAP_DATA_SOURCE_REVIEW.md` before supplying real boundary data. Phase 2 deliberately does not bundle unverified historical geometry. Cliopatria is now the preferred licence-cleared candidate for broad polity / empire context: its data is explicitly CC BY 4.0 and carries dated polygon rows, but its own maintainers warn that territorial representations and periodisation can be uncertain. Validate the exact 1914 features before use; it cannot replace precise Balkan administrative, Sarajevo street, rail, battle-front or alliance data. Other candidates remain constrained: the checked 1914 Zenodo map record has no visible licence field; CShapes 2.0 is CC BY-NC-SA 4.0; and the historical-basemaps GeoJSON data licence remains ambiguous with a maintainer-declined commercial-use request. The NYPL 1911 Sarajevo map remains a promising period scan reference with an international-rights caveat.
