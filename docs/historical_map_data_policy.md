# Historical map data policy

## Phase 2 technical decision

The map renderer uses `react-simple-maps` for declarative SVG geography components, `d3-geo` for projections and geodesic interpolation, and `topojson-client` for converting reviewed TopoJSON to GeoJSON. React Simple Maps supports local GeoJSON/TopoJSON inputs; its current v5 documentation provides separate core components without zoom dependencies.

## Non-negotiable rules

1. A map's date is part of its data identity. A 1914 map cannot silently reuse present-day borders.
2. Every map has a local geometry file and a metadata sidecar containing source, licence, date, scope and verification status.
3. A geometry without provenance is a technical fixture, not a production asset.
4. Map routes, borders, direction arrows, labels and markers are crisp SVG/vector graphics. No watercolor brush effects for routing or pointing.
5. No live basemap tiles, remote geocoding or dynamic web fetches in the final render. All approved data is checked into the local project.
6. Generated concept maps and the synthetic Phase 2 fixture are never used as historical source geometry.

## Required datasets (from Phase 1)

See `reference/phase1/map_data_requirements.csv` for M01–M08: 1914 alliance system; Balkan boundary changes; Sarajevo motorcade geography; Drina context; July Crisis geography; mobilisation and western strategy; Belgium/Liège; and separately dated postwar map frames.

## Data intake workflow

1. Acquire an authoritative, redistributable dataset or georeferenced period plan. Cliopatria is a CC BY 4.0 candidate for broad dated polity shapes; follow `docs/cliopatria_import_plan.md` and do not treat its polygons as self-verifying historical truth.
2. Save original source file unchanged under `public/maps/source/` (not yet created).
3. Write a `.metadata.json` sidecar with citation and licence details.
4. Convert TopoJSON to GeoJSON using `npm run map:convert -- --input ... --object ... --output ...` if useful for a layer.
5. Run `npm run map:audit` and inspect map bounds, feature counts and metadata.
6. Verify boundaries and labels against historical references before changing `verificationStatus` to `verified-for-production`.
7. Only verified geometry may be referenced in documentary compositions.

The phase2 fixture intentionally uses synthetic region labels and is permanently marked `outputAllowed: false`.

## Phase 2 source-review decision

See the root-level `MAP_DATA_SOURCE_REVIEW.md` for the current candidate-source table. Cliopatria (Seshat Global History Databank) is now the preferred licence-cleared candidate for broad polity/empire context: its repository explicitly licenses the data CC BY 4.0 and documents dated EPSG:4326 polygons. It is not yet approved for documentary use; its own maintainers warn that historical borders and periodisation can be uncertain, so feature-level 1914 coverage and boundaries must be reviewed and cross-checked. Do not use it as a substitute for precise Sarajevo streets, railways, battle fronts, internal imperial administration or alliance relationships. Keep the synthetic fixture non-outputtable. The NYPL 1911 Sarajevo sheet remains a useful period reference for M03, but it needs georeferencing and has an international-rights caveat. Do not import CShapes or historical-basemaps into a monetised/commercial workflow without written rights clearance.
