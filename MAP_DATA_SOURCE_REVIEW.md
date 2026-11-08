# Historical map data source review — Phase 2

**Status:** Research leads identified. Cliopatria is now a promising, explicitly CC BY 4.0 data candidate for broad polity mapping, but no geometry is approved for documentary use until period-specific coverage, scope and borders have been reviewed.

This review is intentionally conservative. A map can be visually plausible and still be wrong for the date, boundary regime or purpose shown. Source-file licensing, source citation and historical verification are separate acceptance checks.

## Candidate sources

| Candidate | What it offers | Licence / rights finding | Phase 2 decision |
|---|---|---|---|
| Seshat Global History Databank, **Cliopatria** | Approximately 14K time-ranged polity / political-relation records from 3400 BCE to 2024 CE; polygon geometry in EPSG:4326 with `FromYear`, `ToYear`, `Type`, `Name` and identifiers. | The repository `LICENSE.md` explicitly licenses **the data** under CC BY 4.0, permitting reuse/adaptation/distribution with attribution, a licence link and disclosure of changes. The README cautions that territorial borders and periodisation can be uncertain and users must assess suitability. | **Preferred licence-cleared candidate for M01 broad polity/empire context and selected M02 research.** Not automatically accepted as the final 1914 borders: inspect the dated records, type and coverage, validate against period sources, and preserve uncertainties. Do not use it for precise Sarajevo streets, railways, military fronts or alliance relationships. |
| Jack Kavanagh, *Map of Europe, c. 1914*, Zenodo DOI `10.5281/zenodo.21341486` | 1914 European empires and North African colonial territories as WGS84 geospatial data; low-resolution GeoJSON is listed at 17.1 MB. | Zenodo's public record identifies the author, description and downloadable formats, but the Rights → License field is blank in the record page checked for this review. Do not infer permission from the word “Open” or “open source formats”. | **Best first candidate for M01** once the creator/repository clarifies the data licence. Not imported pending rights clearance and boundary cross-check. |
| Jack Kavanagh, *Map of Europe, c. 1914*, earlier Zenodo record DOI `10.5281/zenodo.20119653` | Earlier version with `first_world_war.json` (18.7 MB) and GeoPackage. | The public record result does not establish a clear data licence. | Keep as version history/context only; not imported. |
| CShapes 2.0 (ETH Zürich) | Time-varying borders of independent states and dependent territories, 1886–2019. | Library of Congress identifies CC BY-NC-SA 4.0. This is non-commercial; unsuitable as the default dataset for a channel that may monetise videos without a separate licence. | **Do not use by default.** Could be reconsidered only with rights clearance and a documented decision. It also does not replace finer Balkan subnational / imperial-admin geography. |
| A. Ourednik, *historical-basemaps* | Year-indexed historical polity / cultural-region polygons, including 1914. The project itself warns that historical borders are disputed and the data is work in progress. | The repository has a GPL-3.0 licence, but an open issue records unresolved ambiguity about applying GPL to the GeoJSON data. In a separate 2026 issue, the maintainer explicitly declined commercial-use permission. | **Exclude for this project unless the maintainer grants a clear compatible licence in writing.** Do not treat the code repository licence as a settled data licence. |
| Xiaokai Ye, *WWI Explorer* | WWI events, front/battle layers, alliances and 1914 borders; the repository states that 1914 borders are used throughout its five-year map. | Repository code is MIT, but the README separately credits the 1914 GeoJSON boundary data to Carlos Matallín. The code licence does not, by itself, prove the upstream map-data licence. | Good discovery lead for M01/M06; request/verify the source-data licence and upstream attribution before copying geometry. |
| New York Public Library, *Sarajevo* (1911), Austro-Hungarian Militärgeographisches Institut | Period topographic map scan; useful as a period reference for M03 street/terrain reconstruction. NYPL lists it as “Free to use without restriction”. | NYPL's detailed rights statement says it believes the item is public domain under US law but has not determined copyright status in other countries. Credit NYPL as requested by its item page. | **Strong reference-map candidate for M03**, but treat it as a scanned map to georeference/trace, not as ready GeoJSON. Record the international rights caveat. |
| Austrian State Archives / Kriegsarchiv cadastral holdings | The archive describes a collection of about 13,000 cadastral maps for parts of Bosnia and Herzegovina dating from the 1880s; access requires a five-part reference code. | Primary archive material; access/reproduction terms and the specific sheet's rights must be established per item. | High-value research lead for M02/M03. Not a ready-to-import dataset. |
| University of Graz GAMS, *Appel Quay / Site of the Assassination* | Historical photographs / object records around Appel Quay and Latin Bridge, with source attribution to the Bosniac Institute. | The displayed CC BY 4.0 note applies to metadata; the record identifies the Bosniac Institute as image source. Do not assume that metadata licence clears the underlying photograph. | Visual/source lead only; request image rights separately. |
| Jack Kavanagh / William Mulligan, *Map of Orient Express Railway c. 1914*, Zenodo DOI `10.5281/zenodo.20120758` | Dedicated railway line geometry in GeoJSON / GPKG / SHP formats. Potentially relevant for a specific Orient Express reference. | Zenodo page says the files are open to fellow researchers, but the licence field was not independently established during this review. | Candidate for a limited rail overlay only after rights and route coverage are checked. Not a proxy for all European military railways. |

## Cliopatria: preferred data candidate, not yet a verified historical map

The Seshat Global History Databank's Cliopatria repository describes a single GeoJSON dataset with roughly 14,000 records. Its records include polygon geometry in EPSG:4326, a `Type` (`POLITY` or `RELATION`), and inclusive `FromYear` / `ToYear` intervals. The intended year filter is `FromYear <= targetYear <= ToYear`; a given polity may have multiple rows as its associated data changes. The repository warns that borders, territorial changes, names and polity durations can be uncertain and explicitly places suitability assessment on the user.

The repository's own `LICENSE.md` states that **the data is licensed under Creative Commons Attribution 4.0 International (CC BY 4.0)**. Required attribution should identify Seshat Global History Databank / Cliopatria, link to the dataset and the CC BY 4.0 licence, and state any modifications. Use a tagged/released snapshot; archive the exact version/commit, original ZIP, licence text and retrieval date with the project. Do not rely on an unpinned `main` branch.

**Potential use:** broad European polity/empire context for M01, and a starting point for M02's dated Balkan polity layers after feature coverage is inspected.

**Not sufficient by itself:** a precise, single authoritative map of every 1914 sovereign boundary; Austro-Hungarian internal crownland/provincial divisions; Ottoman administrative geography; exact Sarajevo street/route geometry; military railway networks; battle fronts; or diplomatic alliance relationships. Alliance links must be authored as a separate data layer and must distinguish treaties, ententes and political relationships.

**Import decision:** do not bundle the full dataset in this Phase 2 scaffold. Before importing a filtered extract, check its 1914 records, duplicate/overlapping polity geometries, `RELATION` rows, names/aliases, geometry validity and boundaries against at least one period source and one independent historical reference. Then add a metadata sidecar with the release tag/commit, source URL, CC BY 4.0, exact attribution, target date, scope, limitations, modifications and rights review date.

## Application to Phase 1 map requirements

| Map ID | Phase 2 recommendation | Data rule |
|---|---|---|
| M01 — 1914 alliance system | Start rights review with the 1914 Zenodo empire map and WWI Explorer attribution chain. Build alliance relationships as separate SVG overlays. | Distinguish formal France–Russia alliance, Dual Alliance, Triple Alliance, Entente Cordiale and Anglo-Russian Convention. Do not make the Triple Entente look like a single binding three-way defence treaty. |
| M02 — Balkans 1878 / 1908 / 1912–13 | Seek period boundary sheets / archive references and compare with scholarly maps. | Make each date a separate dated frame. Do not animate a single boundary as if all changes happened together. |
| M03 — Sarajevo motorcade geography | Begin with NYPL's 1911 Sarajevo map; cross-reference the supplied A08 photograph and period street/landmark records. | Georeference/trace only after validating the Latin Bridge, Appel Quay, Franz Joseph Street, Town Hall, station and hospital direction. Planned route and mistaken turn must be separate paths. |
| M04 — Drina crossing | Use a broad corridor only. | Script does not specify an exact crossing point. No invented pin or precise crossing route. |
| M05 — July Crisis diplomatic geography | Use gazetteer coordinates for cities, date-stamped links and callouts. | Do not infer travel paths or diplomatic timings that the script does not provide. |
| M06 — Mobilisation and western strategy | Combine verified 1914 boundaries with separately sourced railway / strategic data. | Label strategic arrows schematic unless operational detail is sourced. Orient Express data cannot stand in for all military railways. |
| M07 — Belgium / Liège | Source 1914 Belgium/German frontier and period Liège fort / rail geography separately. | Distinguish 2 August passage demand, 3 August declaration on France and 4 August invasion; Big Bertha's later use needs a separate date treatment. |
| M08 — 1918–23 aftermath | Build distinct, dated boundary layers for 1918, 1919 treaty settlements, 1922 Ottoman abolition and 1923 Turkish Republic / Lausanne. | Do not present one instantaneous postwar redraw or treat 1922/1923 changes as the same event. |

## Acceptance checklist before importing any map

- [ ] Data licence explicitly permits the intended use, including any monetised video / commercial distribution.
- [ ] Creator, source title, stable URL/DOI and retrieval date recorded.
- [ ] Historical date and political/administrative scope established.
- [ ] Geometry compared against at least one independent historical source.
- [ ] Known simplifications, disputed areas and confidence limitations documented.
- [ ] Local GeoJSON/TopoJSON and `.metadata.json` sidecar created.
- [ ] `npm run map:audit` passes.
- [ ] Map label hierarchy and colour assignments reviewed against the approved identity bible.

## Research sources

- Seshat Global History Databank, Cliopatria repository and data description: https://github.com/Seshat-Global-History-Databank/cliopatria (approximately 14K dated records; EPSG:4326 polygons; `FromYear` / `ToYear`; data suitability caveat).
- Seshat Global History Databank, Cliopatria data licence: https://github.com/Seshat-Global-History-Databank/cliopatria/blob/main/LICENSE.md (explicit CC BY 4.0 data licence; pin a release/commit before production use).

- Kavanagh, *Map of Europe, c. 1914*, Zenodo record 21341486: https://zenodo.org/records/21341486 (WGS84 description and downloadable files; licence field blank on the checked record page).
- Kavanagh, earlier *Map of Europe, c. 1914*, Zenodo record 20119653: https://zenodo.org/records/20119653.
- Library of Congress catalogue, CShapes 2.0: https://www.loc.gov/item/2023592015/ (1886–2019 coverage; CC BY-NC-SA 4.0 rights advisory).
- A. Ourednik, historical-basemaps licence question: https://github.com/aourednik/historical-basemaps/issues/74 (GeoJSON data licensing ambiguity).
- A. Ourednik, commercial-use permission issue: https://github.com/aourednik/historical-basemaps/issues/76 (maintainer declined commercial permission in a 2026 reply).
- Xiaokai Ye, WWI Explorer: https://github.com/leafsy/wwi-explorer (MIT repository; separate credit to 1914 boundary dataset by Carlos Matallín).
- NYPL, *Sarajevo* (1911): https://old-digitalcollections.nypl.org/items/510d47df-8c9b-a3d9-e040-e00a18064a99 (period topographic map; NYPL rights statement includes a non-US-jurisdiction caveat).
- Austrian State Archives, Bosnia and Herzegovina cadastral maps: https://www.statearchives.gv.at/tasks-and-organisation/kriegsarchiv-information-in-brief/tips-for-researchers1/Researching-in-the-Kriegsarchiv/I-am-looking-for-cadastral-maps-and-related-documents-from-Bosnia-and-Herzegovina.html.
- University of Graz GAMS, Appel Quay item: https://gams.uni-graz.at/o:vase.2114 (underlying image source is identified separately from metadata licence).
- Kavanagh/Mulligan, Orient Express railway c. 1914: https://zenodo.org/records/20120758.
