# Phase 2 technical stack

| Layer | Package / technology | Responsibility |
|---|---|---|
| Timeline / renderer | `remotion`, `@remotion/cli` 4.0.541 | Frame-based compositions, Studio, CLI rendering |
| Audio | `@remotion/media` 4.0.541 | Narration and media timeline integration |
| UI / composition | React 19.2.0 + TypeScript 5.9.3 | Typed reusable scene components |
| Map rendering | `react-simple-maps` 5.0.5 | Declarative SVG geography, markers, lines and annotations |
| Projection / paths | `d3-geo` 3.1.2 | Geographic projections, bounds and geodesic interpolation |
| Topology conversion | `topojson-client` 3.1.0 | Convert reviewed TopoJSON objects to GeoJSON |
| Asset loading | Remotion `staticFile()` / `<Img>` | Local, deterministic media paths |
| Paint transitions (later phase) | Custom SVG mask / texture components | Bespoke paint reveals and dissolves; not used for map routes |
| Mapping data | Local, reviewed GeoJSON / TopoJSON | Dated historical geometry; not downloaded live at render time |

All `remotion` and `@remotion/*` dependencies are pinned to the exact same version. Do not use `^` ranges for these packages.

## Intentionally not in Phase 2

- No p5.js or p5.brush dependency: Remotion becomes the native composition framework; the prior iframe bridge was an A/B prototype, not the long-term architecture.
- No `world-atlas` modern administrative borders as a stand-in for 1914.
- No live map tile provider or web geocoder.
- No character rig or illustration-generation library yet; those belong to Phase 3 / Phase 4 after the scene library is specified.
- No transition package is required at this point; custom scene transition masks can be written in native React/SVG and styled to the approved paint language.
