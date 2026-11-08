import fs from 'node:fs';
import path from 'node:path';

const historicalDir = path.resolve('public/maps/historical');
fs.mkdirSync(historicalDir, {recursive: true});
const files = fs.readdirSync(historicalDir).filter((f) => /\.(geojson|json|topojson)$/i.test(f));

// Keep the empty-intake check dependency-free. d3-geo and topojson-client are
// only loaded after real candidate geometry is added to this directory.
if (!files.length) {
  console.log('No production historical map geometry found. This is expected for Phase 2.');
  console.log('Do not substitute the synthetic fixture or present-day borders for dated historical boundaries.');
  process.exit(0);
}

const [{geoArea, geoBounds}, {feature: topoFeature}] = await Promise.all([
  import('d3-geo'),
  import('topojson-client'),
]);

const errors = [];
const allowedStatuses = new Set(['needs-historical-verification', 'verified-for-production']);

for (const file of files) {
  const full = path.join(historicalDir, file);
  const metadataPath = full.replace(/\.(geojson|json|topojson)$/i, '.metadata.json');
  if (!fs.existsSync(metadataPath)) {
    errors.push(`${file}: missing metadata sidecar ${path.basename(metadataPath)}.`);
    continue;
  }

  let raw;
  let metadata;
  try {
    raw = JSON.parse(fs.readFileSync(full, 'utf8'));
  } catch (error) {
    errors.push(`${file}: invalid geometry JSON (${error.message}).`);
    continue;
  }
  try {
    metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
  } catch (error) {
    errors.push(`${file}: invalid metadata JSON (${error.message}).`);
    continue;
  }

  for (const key of ['historicalDate', 'sourceTitle', 'sourceUrl', 'licence', 'verificationStatus', 'scope', 'notes']) {
    if (metadata[key] === undefined || metadata[key] === null || String(metadata[key]).trim() === '') {
      errors.push(`${file}: metadata missing ${key}.`);
    }
  }
  if (!allowedStatuses.has(metadata.verificationStatus)) {
    errors.push(`${file}: unsupported verificationStatus "${metadata.verificationStatus}".`);
  }
  try {
    const parsedUrl = new URL(metadata.sourceUrl);
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) throw new Error('URL must use HTTP or HTTPS.');
  } catch {
    errors.push(`${file}: sourceUrl must be a valid HTTP(S) URL.`);
  }
  if (metadata.verificationStatus === 'verified-for-production' && !metadata.rightsReviewedAt) {
    errors.push(`${file}: production-verified geometry must include rightsReviewedAt in its metadata.`);
  }

  let geo;
  if (raw.type === 'Topology') {
    const objectNames = Object.keys(raw.objects ?? {});
    const objectName = metadata.topologyObject;
    if (!objectName) {
      errors.push(`${file}: TopoJSON metadata must specify topologyObject; refusing to silently pick the first object.`);
      continue;
    }
    if (!raw.objects?.[objectName]) {
      errors.push(`${file}: topologyObject "${objectName}" not found. Available: ${objectNames.join(', ')}.`);
      continue;
    }
    try {
      geo = topoFeature(raw, raw.objects[objectName]);
    } catch (error) {
      errors.push(`${file}: TopoJSON conversion failed (${error.message}).`);
      continue;
    }
  } else {
    geo = raw;
  }

  if (!geo || !['FeatureCollection', 'Feature'].includes(geo.type)) {
    errors.push(`${file}: expected GeoJSON FeatureCollection / Feature or TopoJSON Topology.`);
    continue;
  }
  try {
    const bounds = geoBounds(geo);
    const area = geoArea(geo);
    if (!Number.isFinite(area) || !bounds.flat().every(Number.isFinite)) {
      throw new Error('Geometry produced non-finite bounds or area.');
    }
    console.log(`${file}: bounds=${JSON.stringify(bounds)}, sphericalArea=${area.toFixed(5)}, verification=${metadata.verificationStatus}`);
  } catch (error) {
    errors.push(`${file}: d3-geo could not read geometry (${error.message}).`);
  }
}

if (errors.length) {
  console.error('\nMap audit failed:\n- ' + errors.join('\n- '));
  process.exit(1);
}
console.log(`\nMap audit passed for ${files.length} local map file(s). Historical accuracy still requires human review.`);
