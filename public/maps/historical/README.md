# Historical map data intake

No production historical geography is included at Phase 2.

Add locally stored `.geojson` or `.topojson` files only after source review. Every file must have a sibling `.metadata.json` sidecar with:

- `historicalDate`
- `sourceTitle`
- `sourceUrl`
- `licence`
- `verificationStatus` (`verified-for-production` or `needs-historical-verification`)
- `scope`
- `notes`

Modern administrative boundaries must not be used as 1914 boundaries. Do not fetch online tiles or live geocoding during final rendering. See `docs/historical_map_data_policy.md` and `reference/phase1/map_data_requirements.csv`.
