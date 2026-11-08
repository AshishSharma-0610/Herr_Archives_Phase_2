import fs from 'node:fs';
import path from 'node:path';

function readArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith('--')) continue;
    const key = token.slice(2);
    const value = argv[i + 1];
    if (!value || value.startsWith('--')) throw new Error(`Missing value for --${key}`);
    out[key] = value;
    i += 1;
  }
  return out;
}

export function filterCliopatriaFeatures(collection, {year, type = 'POLITY', name} = {}) {
  if (!collection || collection.type !== 'FeatureCollection' || !Array.isArray(collection.features)) {
    throw new Error('Input must be a GeoJSON FeatureCollection.');
  }
  if (!Number.isInteger(year)) throw new Error('A whole-number --year is required.');
  if (!['POLITY', 'RELATION'].includes(type)) throw new Error('--type must be POLITY or RELATION.');

  const wantedName = name?.trim().toLocaleLowerCase();
  const features = collection.features.filter((feature) => {
    const properties = feature?.properties;
    if (!properties || properties.Type !== type) return false;
    const fromYear = properties.FromYear;
    const toYear = properties.ToYear;
    if (!Number.isInteger(fromYear) || !Number.isInteger(toYear) || fromYear > toYear) return false;
    if (year < fromYear || year > toYear) return false;
    if (wantedName && String(properties.Name ?? '').trim().toLocaleLowerCase() !== wantedName) return false;
    return feature.type === 'Feature' && feature.geometry != null;
  });

  return {
    type: 'FeatureCollection',
    name: `Cliopatria ${type.toLowerCase()} features active in ${year}`,
    features,
  };
}

function selfTest() {
  const collection = {
    type: 'FeatureCollection',
    features: [
      {type: 'Feature', properties: {Name: 'German Empire', Type: 'POLITY', FromYear: 1871, ToYear: 1918}, geometry: {type: 'Polygon', coordinates: []}},
      {type: 'Feature', properties: {Name: 'German Empire', Type: 'POLITY', FromYear: 1919, ToYear: 1945}, geometry: {type: 'Polygon', coordinates: []}},
      {type: 'Feature', properties: {Name: 'Alliance relation', Type: 'RELATION', FromYear: 1910, ToYear: 1920}, geometry: {type: 'Polygon', coordinates: []}},
      {type: 'Feature', properties: {Name: 'Boundary year test', Type: 'POLITY', FromYear: 1914, ToYear: 1914}, geometry: {type: 'Polygon', coordinates: []}},
      {type: 'Feature', properties: {Name: 'Before 1914', Type: 'POLITY', FromYear: 1880, ToYear: 1913}, geometry: {type: 'Polygon', coordinates: []}},
    ],
  };
  const selected = filterCliopatriaFeatures(collection, {year: 1914});
  if (selected.features.length !== 2) throw new Error(`Self-test expected 2 active polity features, found ${selected.features.length}.`);
  if (selected.features.some((f) => f.properties.Type !== 'POLITY')) throw new Error('Self-test leaked a RELATION feature into polity output.');
  const named = filterCliopatriaFeatures(collection, {year: 1914, name: 'german empire'});
  if (named.features.length !== 1) throw new Error('Self-test exact-name filter failed.');
  return true;
}

const args = readArgs(process.argv.slice(2));
if (args.selfTest === 'true') {
  selfTest();
  console.log('Cliopatria filter self-test passed (inclusive dates, polity/relation separation, exact name filter).');
} else {
  const input = args.input;
  const output = args.output;
  const year = Number(args.year);
  const type = args.type ?? 'POLITY';
  const name = args.name;
  if (!input || !output || !Number.isInteger(year)) {
    console.error('Usage: node scripts/filter-cliopatria.mjs --input <source.geojson> --output <filtered.geojson> --year 1914 [--type POLITY|RELATION] [--name "German Empire"]');
    process.exit(2);
  }
  const sourcePath = path.resolve(input);
  const outputPath = path.resolve(output);
  const collection = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
  const filtered = filterCliopatriaFeatures(collection, {year, type, name});
  fs.mkdirSync(path.dirname(outputPath), {recursive: true});
  fs.writeFileSync(outputPath, `${JSON.stringify(filtered)}\n`);
  console.log(`Wrote ${filtered.features.length} ${type} feature(s) active in ${year}: ${outputPath}`);
  console.log('Filtering is not historical verification. Review source coverage, overlaps, names and geometry before production use.');
}
