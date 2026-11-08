import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {performance} from 'node:perf_hooks';

const runs = [
  {id: 'Phase2MapBenchmark720', output: 'out/phase2-map-benchmark-720.mp4', width: 1280, height: 720, frames: 192},
  {id: 'Phase2MapBenchmark1080', output: 'out/phase2-map-benchmark-1080.mp4', width: 1920, height: 1080, frames: 192},
];
const cli = process.platform === 'win32'
  ? path.resolve('node_modules/.bin/remotion.cmd')
  : path.resolve('node_modules/.bin/remotion');
if (!fs.existsSync(cli)) {
  console.error('Remotion CLI not found. Run npm ci first.');
  process.exit(1);
}
fs.mkdirSync('out', {recursive: true});
const results = [];
for (const run of runs) {
  const start = performance.now();
  const result = spawnSync(cli, ['render', 'src/index.tsx', run.id, run.output, '--codec=h264', '--crf=18', '--concurrency=1'], {
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: process.env,
  });
  const elapsedSeconds = (performance.now() - start) / 1000;
  if (result.status !== 0) {
    console.error(`Benchmark render failed: ${run.id}`);
    process.exit(result.status ?? 1);
  }
  results.push({
    composition: run.id,
    resolution: `${run.width}x${run.height}`,
    fps: 24,
    frames: run.frames,
    elapsedSeconds: Number(elapsedSeconds.toFixed(2)),
    averageFramesPerSecond: Number((run.frames / elapsedSeconds).toFixed(2)),
    output: run.output,
  });
}
const report = {
  generatedAt: new Date().toISOString(),
  node: process.version,
  note: 'Technical rendering benchmark only; not a visual-quality validation.',
  runs: results,
};
fs.writeFileSync('out/benchmark-results.json', JSON.stringify(report, null, 2));
console.log('\nBenchmark report written to out/benchmark-results.json');
console.table(results.map(({composition, resolution, elapsedSeconds, averageFramesPerSecond}) => ({composition, resolution, elapsedSeconds, averageFramesPerSecond})));
