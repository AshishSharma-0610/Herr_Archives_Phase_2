# Phase 2 local rendering benchmark

## Included compositions

- `Phase2MapBenchmark720`: 1280 × 720, 24 fps, 8 seconds, 192 frames.
- `Phase2MapBenchmark1080`: 1920 × 1080, 24 fps, 8 seconds, 192 frames.
- `Phase2AssetPipelinePreview`: 1920 × 1080, 24 fps, 6 seconds.
- `Phase2AudioSyncBenchmark`: 1920 × 1080, 24 fps, 12 seconds with a local 12-second narration excerpt.
- `Phase2ArchitectureOverview`: 1920 × 1080, 24 fps, 6 seconds.

The map benchmark exercises local GeoJSON parsing, SVG geography paths, a D3 geodesic interpolation, route endpoint progression and markers. It contains deliberately synthetic geography and is not an art or historical-accuracy benchmark.

## Run

```bash
npm ci
npm run check
npm run map:audit
npm run dev
npm run render:map:720
npm run render:map:1080
npm run render:assets
npm run render:audio
```

Or run both map renders and record wall-clock times:

```bash
npm run benchmark
```

The script writes `out/benchmark-results.json` with runtime, resolution, frame count and average frames per second. Run each benchmark twice; discard the first run if browser/cache warmup makes it atypical. Keep the concurrency at 1 for the initial baseline. Increase only after observing memory use and stability on the target machine.

## What to record

- Machine / CPU / GPU / RAM / OS
- Node version and package versions
- Render runtime and average fps
- Peak memory if available
- Any missing frame, browser crash, asset fetch or font warning
- Whether ANGLE and software rendering behave differently

This is a technical throughput benchmark only. It does not validate final animation style or documentary scene quality.
