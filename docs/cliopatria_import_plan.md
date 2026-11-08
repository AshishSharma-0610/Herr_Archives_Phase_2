# Cliopatria import plan (Phase 2)

## Source and licence

- Maintainer: Seshat Global History Databank.
- Repository: https://github.com/Seshat-Global-History-Databank/cliopatria
- Data licence: Creative Commons Attribution 4.0 International (CC BY 4.0), as stated in the repository's `LICENSE.md`.
- Data shape documented by the maintainer: GeoJSON, EPSG:4326; roughly 14K time-ranged rows; `Name`, `Type` (`POLITY` or `RELATION`), `FromYear`, `ToYear`, polygon geometry and identifiers.
- Maintainer warning: historical territories, boundaries, polity names and dates can be uncertain; suitability must be assessed by the user.

## Acquisition rule

Use a tagged/released snapshot, not an unpinned `main` branch. Retain the exact release tag / commit SHA, source archive, licence text, retrieval date, and attribution note. Do not bundle the full dataset in the production repo until the 1914 extract has been scoped and audited.

## Filter records by year

After downloading and unzipping the source data, use the Phase 2 filter:

```bash
npm run map:filter:clio -- --input data/cliopatria.geojson --output public/maps/historical/cliopatria-polities-1914.geojson --year 1914 --type POLITY
```

For a single polity name (exact, case-insensitive):

```bash
npm run map:filter:clio -- --input data/cliopatria.geojson --output public/maps/historical/german-empire-1914.geojson --year 1914 --type POLITY --name "German Empire"
```

`FromYear` and `ToYear` are treated as inclusive. The default type is `POLITY`; `RELATION` rows are kept separate and must not be drawn as territorial polygons. The script only filters documented fields. It does not resolve disputed borders, merge duplicate rows, determine legal sovereignty or establish that a specific geometry is historically correct.

The script has a dependency-free synthetic logic test:

```bash
npm run map:filter:clio:test
```

## Attribution

Suggested attribution on a production map credit/caption page:

> Data: Seshat Global History Databank, Cliopatria, CC BY 4.0. https://github.com/Seshat-Global-History-Databank/cliopatria. Filtered for [year] and [scope]; geometry/labels adapted by Herr Archives. Changes made: [describe]. Licence: https://creativecommons.org/licenses/by/4.0/.

Adjust the change statement to match the exact work actually performed. Include release tag/commit and retrieval date in the internal asset metadata.

## Verification required before `verified-for-production`

1. Inspect every returned 1914 feature and its `Type`, name, date interval and geometry.
2. Check for gaps, duplicates, unexpected overlaps and boundary simplification.
3. Confirm the intended political entity/date relationship against period sources.
4. Distinguish sovereign borders from imperial internal divisions, protectorates, dependencies, colonial holdings and political relationships.
5. Cross-check each used map against an independent historical map or authoritative scholarly source.
6. Keep disputed areas visibly qualified; do not draw certainty that the source does not support.
7. Complete a rights review date and preserve the exact CC BY 4.0 attribution in the map sidecar.

Cliopatria may be useful for broad polity/empire context. It is not a substitute for the Sarajevo street plan, motorcade route, military railways, battle fronts, alliance treaty diagrams or fine administrative subdivisions.
