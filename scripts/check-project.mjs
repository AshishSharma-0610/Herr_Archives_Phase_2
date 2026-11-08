import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const required = [
  'package.json', 'tsconfig.json', 'src/index.tsx', 'src/Root.tsx',
  'src/maps/AtlasMap.tsx', 'src/compositions/MapPipelineBenchmark.tsx',
  'src/compositions/AssetPipelinePreview.tsx', 'src/compositions/ArchitectureOverview.tsx',
  'src/maps/fixtures/map-pipeline-fixture.geojson',
  'public/assets/archival/A06_Franz_Ferdinand_Sophie_Graf_Stift_1914.jpeg',
  'public/assets/archival/A08_Appel_Quay_Sarajevo_1914.png',
  'public/assets/audio/phase2-audio-sample.mp3',
  'src/compositions/AudioSyncBenchmark.tsx',
  'reference/phase1/shot_plan_113.csv', 'reference/phase1/map_data_requirements.csv',
];
const missing = required.filter((f) => !fs.existsSync(path.join(root, f)));
if (missing.length) {
  console.error('Missing required project files:', missing.join(', '));
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const remotionVersions = Object.entries(pkg.dependencies)
  .filter(([name]) => name === 'remotion' || name.startsWith('@remotion/'))
  .map(([name, version]) => [name, version]);
const distinct = [...new Set(remotionVersions.map(([, version]) => version))];
if (distinct.length !== 1) {
  console.error('Remotion package versions are mismatched:', remotionVersions);
  process.exit(1);
}

const geo = JSON.parse(fs.readFileSync(path.join(root, 'src/maps/fixtures/map-pipeline-fixture.geojson'), 'utf8'));
if (geo.type !== 'FeatureCollection' || !Array.isArray(geo.features) || geo.features.length < 1) {
  console.error('Map fixture is not a valid GeoJSON FeatureCollection.');
  process.exit(1);
}
if (!geo.features.every((f) => f.properties?.fixture === true && f.properties?.name)) {
  console.error('All fixture features must be clearly marked as synthetic.');
  process.exit(1);
}

const source = fs.readFileSync(path.join(root, 'src/maps/mapRegistry.ts'), 'utf8');
if (!source.includes('outputAllowed: false') || !source.includes('synthetic-fixture')) {
  console.error('Map registry must mark the synthetic fixture as non-output data.');
  process.exit(1);
}

const files = fs.readdirSync(path.join(root, 'public/assets/archival'));
const excludedRefs = ['Princip official police mugshot', 'A10_Princip', 'A11_Cabrinovic_Arrest'];
const activeRegistryText = fs.readFileSync(path.join(root, 'src/assets/assetRegistry.ts'), 'utf8');
if (excludedRefs.some((value) => files.some((f) => f.includes(value)) || activeRegistryText.includes(value))) {
  console.error('An excluded / held image appears in active project assets.');
  process.exit(1);
}
if (files.length !== 2) {
  console.error(`Expected 2 selectively bundled archival reference images; found ${files.length}.`);
  process.exit(1);
}

console.log('Phase 2 project check passed.');
console.log(`Remotion packages aligned at ${distinct[0]}.`);
console.log(`Synthetic fixture: ${geo.features.length} features; outputAllowed=false.`);
console.log(`Archival references bundled: ${files.join(', ')}.`);
console.log('Local narration excerpt present for Remotion audio sync test.');
console.log('No production historical map geometry is present; this is expected at Phase 2.');
