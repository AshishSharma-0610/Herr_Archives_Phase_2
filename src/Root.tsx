import React from "react";
import {Composition, Folder} from "remotion";
import {MapPipelineBenchmark} from "./compositions/MapPipelineBenchmark";
import {AssetPipelinePreview} from "./compositions/AssetPipelinePreview";
import {ArchitectureOverview} from "./compositions/ArchitectureOverview";
import {AudioSyncBenchmark} from "./compositions/AudioSyncBenchmark";

export const RemotionRoot: React.FC = () => (
  <>
    <Folder name="Phase-2-Architecture">
      <Composition
        id="Phase2ArchitectureOverview"
        component={ArchitectureOverview}
        width={1920}
        height={1080}
        fps={24}
        durationInFrames={144}
      />
      <Composition
        id="Phase2AssetPipelinePreview"
        component={AssetPipelinePreview}
        width={1920}
        height={1080}
        fps={24}
        durationInFrames={144}
      />
      <Composition
        id="Phase2AudioSyncBenchmark"
        component={AudioSyncBenchmark}
        width={1920}
        height={1080}
        fps={24}
        durationInFrames={288}
      />
    </Folder>
    <Folder name="Phase-2-Map-Benchmarks">
      <Composition
        id="Phase2MapBenchmark720"
        component={MapPipelineBenchmark}
        width={1280}
        height={720}
        fps={24}
        durationInFrames={192}
      />
      <Composition
        id="Phase2MapBenchmark1080"
        component={MapPipelineBenchmark}
        width={1920}
        height={1080}
        fps={24}
        durationInFrames={192}
      />
    </Folder>
  </>
);
