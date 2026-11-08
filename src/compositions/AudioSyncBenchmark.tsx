import React from "react";
import {Audio} from "@remotion/media";
import {AbsoluteFill, staticFile, useCurrentFrame} from "remotion";
import {PALETTE, TYPOGRAPHY} from "../brand/palette";

const bars = Array.from({length: 64}, (_, i) => 12 + ((i * 17) % 31));

export const AudioSyncBenchmark: React.FC = () => {
  const frame = useCurrentFrame();
  const playhead = (frame / 287) * 100;
  return (
    <AbsoluteFill style={{background: PALETTE.paperCream, padding: 64, color: PALETTE.inkNavy}}>
      <Audio src={staticFile("assets/audio/phase2-audio-sample.mp3")} volume={1} />
      <div style={{fontFamily: TYPOGRAPHY.display, fontSize: 20, letterSpacing: 4}}>HERR ARCHIVES · PHASE 2</div>
      <div style={{fontFamily: TYPOGRAPHY.editorial, fontSize: 54, marginTop: 12}}>Narration audio sync test</div>
      <div style={{font: "18px/1.5 Arial, sans-serif", color: "#665E52", marginTop: 8}}>12-second excerpt from the supplied master narration · 24 fps · deterministic frame counter</div>
      <div style={{marginTop: 100, height: 210, display: "flex", alignItems: "center", gap: 6, borderBottom: `2px solid ${PALETTE.stone}`, borderTop: `2px solid ${PALETTE.stone}`, padding: "0 20px"}}>
        {bars.map((height, index) => {
          const isPast = index / bars.length <= frame / 288;
          return <div key={index} style={{height: `${height + ((index * 13 + frame) % 11)}%`, flex: 1, background: isPast ? PALETTE.burgundy : PALETTE.slateBlue, opacity: isPast ? 0.95 : 0.42, borderRadius: 3}} />;
        })}
      </div>
      <div style={{height: 8, background: "#D9CCB4", marginTop: 22}}>
        <div style={{width: `${playhead}%`, height: "100%", background: PALETTE.terracotta}} />
      </div>
      <div style={{display: "flex", justifyContent: "space-between", marginTop: 14, font: "700 16px Arial, sans-serif"}}>
        <span>00:00</span><span>FRAME {String(frame).padStart(3, "0")} / 287</span><span>00:12</span>
      </div>
      <div style={{marginTop: "auto", padding: 22, background: PALETTE.inkNavy, color: PALETTE.paperCream, font: "16px/1.5 Arial, sans-serif"}}>
        Verify audio begins at frame 0, stays aligned while scrubbing, and ends at the expected duration. The waveform illustration is a sync UI test, not a measured waveform.
      </div>
    </AbsoluteFill>
  );
};
