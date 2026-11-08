import fs from 'node:fs';
import path from 'node:path';
import {feature as topoFeature} from 'topojson-client';
import {geoBounds, geoArea} from 'd3-geo';

const args = {};
for (let i = 2; i < process.argv.length; i += 1) {
  const token = process.argv[i];
  if (!token.startsWith('--')) continue;
  const withoutPrefix = token.slice(2);
  const equalIndex = withoutPrefix.indexOf('=');
  if (equalIndex >= 0) {
    args[withoutPrefix.slice(0, equalIndex)] = withoutPrefix.slice(equalIndex + 1);
  } else {
    args[withoutPrefix] = process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[++i] : '';
  }
}
const required = ['input', 'object', 'output', 'date', 'source-title', 'source-url', 'licence'];
const missing = required.filter((key) => !args[key]);
if (missing.length) {
  console.error('Usage: npm run map:convert -- --input input.topojson --object countries --output public/maps/historical/europe-1914.geojson --date 1914 --source-title "Dataset" --source-url "https://..." --licence "Licence"');
  console.error('Missing:', missing.join(', '));
  process.exit(1);
}

const inputPath = path.resolve(args.input);
const outputPath = path.resolve(args.output);
const topology = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
if (topology.type !== 'Topology') throw new Error('Input is not a TopoJSON Topology.');
if (!topology.objects?.[args.object]) throw new Error(`TopoJSON object "${args.object}" not found. Available: ${Object.keys(topology.objects ?? {}).join(', ')}`);
const geo = topoFeature(topology, topology.objects[args.object]);
fs.mkdirSync(path.dirname(outputPath), {recursive: true});
fs.writeFileSync(outputPath, JSON.stringify(geo));
const metadata = {
  historicalDate: args.date,
  sourceTitle: args['source-title'],
  sourceUrl: args['source-url'],
  licence: args.licence,
  verificationStatus: 'needs-historical-verification',
  scope: args.scope || 'Not yet specified; set scope before production use.',
  notes: 'Converted from TopoJSON. Conversion does not verify historical accuracy, attribution, date, or completeness.',
  inputFile: path.relative(process.cwd(), inputPath),
  topologyObject: args.object,
  geometryBounds: geoBounds(geo),
  sphericalArea: geoArea(geo),
};
fs.writeFileSync(outputPath.replace(/\.geojson$/i, '.metadata.json'), JSON.stringify(metadata, null, 2));
console.log(`Converted ${inputPath} -> ${outputPath}`);
console.log('Verification status deliberately remains needs-historical-verification. Human review is required.');
