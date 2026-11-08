import React from "react";
import {AbsoluteFill} from "remotion";
import {PALETTE, TYPOGRAPHY} from "../brand/palette";

const layers: Array<[string, string, string]> = [
  ["01", "Remotion timeline", "Composition timing, chapter sequencing, audio sync and deterministic frame rendering."],
  ["02", "Historical map pipeline", "React Simple Maps + D3 Geo + TopoJSON Client; local, dated, source-attributed geometry."],
  ["03", "Asset registry", "Metadata-first archival assets with caption, provenance, rights and usage status."],
  ["04", "Visual component system", "Reusable world-space, camera, type, texture and transition components; no character production assets in Phase 2."],
  ["05", "Render QA", "Fixed benchmark compositions, still-frame captures, map audits and measured render throughput."],
];

export const ArchitectureOverview: React.FC = () => (
  <AbsoluteFill style={{background: `linear-gradient(140deg, ${PALETTE.paperCream}, #E5D7BB)`, padding: 60, color: PALETTE.inkNavy}}>
    <div style={{fontFamily: TYPOGRAPHY.display, fontSize: 20, letterSpacing: 4}}>HERR ARCHIVES</div>
    <div style={{fontFamily: TYPOGRAPHY.editorial, fontSize: 54, marginTop: 8}}>World War One · Production Architecture</div>
    <div style={{font: "700 14px Arial, sans-serif", color: PALETTE.burgundy, letterSpacing: 2, marginTop: 8}}>PHASE 2 FOUNDATION · NOT A PRODUCTION SCENE</div>
    <div style={{display: "grid", gridTemplateColumns: "1fr 110px 1fr", gap: 18, flex: 1, alignItems: "center", marginTop: 44}}>
      <div style={{display: "flex", flexDirection: "column", gap: 18}}>
        {layers.slice(0, 3).map(([n, title, copy]) => <Layer key={n} n={n} title={title} copy={copy} />)}
      </div>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24}}>
        <div style={{width: 2, height: 80, background: PALETTE.burgundy}} />
        <div style={{width: 90, height: 90, borderRadius: 90, display: "flex", alignItems: "center", justifyContent: "center", background: PALETTE.inkNavy, color: PALETTE.paperCream, font: "bold 14px Arial, sans-serif", textAlign: "center"}}>REMOTION<br/>CORE</div>
        <div style={{width: 2, height: 80, background: PALETTE.burgundy}} />
      </div>
      <div style={{display: "flex", flexDirection: "column", gap: 18}}>
        {layers.slice(3).map(([n, title, copy]) => <Layer key={n} n={n} title={title} copy={copy} />)}
        <div style={{padding: 22, background: PALETTE.inkNavy, color: PALETTE.paperCream, border: `2px solid ${PALETTE.burgundy}`}}>
          <div style={{color: PALETTE.marigold, font: "700 14px Arial, sans-serif", letterSpacing: 1.4}}>PHASE BOUNDARY</div>
          <div style={{font: "17px/1.5 Arial, sans-serif", marginTop: 8}}>No character rigs, final illustrations, historical map datasets or documentary scenes are built in this phase.</div>
        </div>
      </div>
    </div>
    <div style={{font: "13px Arial, sans-serif", color: "#716757", marginTop: 28}}>LOCAL ASSETS ONLY · NO LIVE TILE FETCHING · GEOGRAPHY MUST BE HISTORICALLY DATED AND SOURCED</div>
  </AbsoluteFill>
);

const Layer: React.FC<{n: string; title: string; copy: string}> = ({n, title, copy}) => (
  <div style={{padding: 22, minHeight: 130, border: `1px solid ${PALETTE.stone}`, background: "rgba(247,238,219,.88)", boxShadow: "0 8px 24px rgba(41,55,70,.07)"}}>
    <div style={{font: "700 13px Arial, sans-serif", color: PALETTE.burgundy, letterSpacing: 1.5}}>{n}</div>
    <div style={{fontFamily: TYPOGRAPHY.editorial, fontSize: 25, margin: "6px 0"}}>{title}</div>
    <div style={{font: "15px/1.45 Arial, sans-serif", color: "#5C554B"}}>{copy}</div>
  </div>
);
