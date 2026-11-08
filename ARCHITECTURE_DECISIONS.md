# Architecture decisions — Phase 2

## ADR-001: Remotion is the composition and render authority

Accepted. All motion values will derive deterministically from `useCurrentFrame()` and composition metadata. No `requestAnimationFrame`, wall-clock animation, random unseeded drawing or non-deterministic remote assets in production scenes.

## ADR-002: Native React/SVG map system

Accepted. Use React Simple Maps for SVG geography components, d3-geo for projection and geodesic math, and TopoJSON Client for topology conversion. Consume local source files only.

## ADR-003: Historic map accuracy is data-governed

Accepted. The map system will not assume present-day borders represent 1914. A source, licence, historical date and verification status are mandatory. Synthetic fixtures cannot be used in final documentary renders.

## ADR-004: Clean vector data graphics

Accepted. Routes, markers, borders, arrows and map labels use crisp SVG. Brush/watercolor effects are reserved for illustrated world assets and scene transitions.

## ADR-005: Metadata-first archival assets

Accepted. Images are referenced through one registry that stores caption, provenance, intended use and rights state. The excluded Princip image and held Čabrinović image are absent from the Phase 2 asset bundle.

## ADR-006: Phase boundary

This package contains technical foundations, tests and placeholder benchmarks only. It does not implement production characters, environments, the Sarajevo scene or the full WWI timeline.
