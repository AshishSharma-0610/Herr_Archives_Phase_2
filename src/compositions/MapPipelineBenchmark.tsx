import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {geoInterpolate} from "d3-geo";
import {staticFile} from "remotion";
import {AtlasMap} from "../maps/AtlasMap";
import {PALETTE, TYPOGRAPHY} from "../brand/palette";

const START = [-9, 45] as const;
const END = [13, 55] as const;
const geodesic = geoInterpolate(START as [number, number], END as [number, number]);

export const MapPipelineBenchmark: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const progress = interpolate(frame, [24, durationInFrames - 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const moving = geodesic(progress) as [number, number];
  const routeTip = geodesic(progress) as [number, number];
  const pulse = 0.5 + 0.5 * Math.sin(frame * 0.18);

  return (
    <AbsoluteFill style={{background: PALETTE.paperCream, padding: 48, color: PALETTE.inkNavy}}>
      <AbsoluteFill style={{background: "radial-gradient(circle at 80% 8%, rgba(230,183,79,0.23), transparent 34%), linear-gradient(135deg, #F7EEDB 0%, #EFE6D2 60%, #E6D4B6 100%)"}} />
      <div style={{position: "relative", height: 110, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <div>
          <div style={{fontFamily: TYPOGRAPHY.display, fontSize: 20, letterSpacing: 4}}>HERR ARCHIVES</div>
          <div style={{fontFamily: TYPOGRAPHY.editorial, fontSize: 44, lineHeight: 1.05}}>Atlas Map Pipeline</div>
        </div>
        <div style={{textAlign: "right", fontFamily: TYPOGRAPHY.utility, fontSize: 17, lineHeight: 1.5}}>
          <div style={{color: PALETTE.burgundy, fontWeight: 800, letterSpacing: 2}}>PHASE 2 · TECHNICAL TEST</div>
          <div>Local GeoJSON · SVG paths · Frame-driven route reveal</div>
        </div>
      </div>
      <div style={{position: "relative", display: "grid", gridTemplateColumns: "1fr 360px", gap: 28, flex: 1, minHeight: 0}}>
        <div style={{position: "relative", border: `2px solid ${PALETTE.stone}`, background: "#E8DFC9", overflow: "hidden", boxShadow: "0 16px 36px rgba(41,55,70,.12)"}}>
          <AtlasMap
            geography={staticFile("maps/fixtures/map-pipeline-fixture.geojson")}
            routeStart={START}
            routeEnd={END}
            routeProgressEnd={routeTip}
            movingMarker={moving}
            title="SCHEMATIC REGION TEST"
            width={1100}
            height={680}
            showFixtureWatermark
          />
        </div>
        <div style={{display: "flex", flexDirection: "column", gap: 18}}>
          <div style={{padding: 22, background: "rgba(247,238,219,.88)", border: `1px solid ${PALETTE.stone}`}}>
            <div style={{fontFamily: TYPOGRAPHY.editorial, fontSize: 27, marginBottom: 12}}>Pipeline capabilities</div>
            {[
              "GeoJSON / TopoJSON input",
              "Local, offline map geometry",
              "Projected SVG boundaries",
              "Crisp route paths and arrow logic",
              "Geographic markers and labels",
              "Frame-deterministic reveal",
            ].map((item) => (
              <div key={item} style={{display: "flex", gap: 10, font: "17px/1.4 Arial, sans-serif", margin: "10px 0"}}>
                <span style={{color: PALETTE.foliage, fontWeight: 900}}>✓</span><span>{item}</span>
              </div>
            ))}
          </div>
          <div style={{padding: 22, background: "rgba(247,238,219,.88)", border: `1px solid ${PALETTE.stone}`}}>
            <div style={{fontFamily: TYPOGRAPHY.editorial, fontSize: 25, marginBottom: 12}}>Route reveal</div>
            <div style={{height: 10, background: "#D7CCB6", overflow: "hidden"}}>
              <div style={{width: `${Math.max(0, progress) * 100}%`, height: "100%", background: PALETTE.burgundy}} />
            </div>
            <div style={{display: "flex", justifyContent: "space-between", marginTop: 9, font: "14px Arial, sans-serif"}}>
              <span>START</span><span>{Math.round(progress * 100)}%</span><span>END</span>
            </div>
            <div style={{marginTop: 18, color: PALETTE.burgundy, font: "700 13px Arial, sans-serif", letterSpacing: 1.3}}>
              NO BRUSH ROUTING · VECTOR ONLY
            </div>
          </div>
          <div style={{marginTop: "auto", padding: 18, background: PALETTE.inkNavy, color: PALETTE.paperCream, font: "14px/1.5 Arial, sans-serif"}}>
            <div style={{fontWeight: 800, letterSpacing: 1.1, color: PALETTE.marigold, marginBottom: 5}}>DATA WARNING</div>
            This fixture contains invented test regions. It is not Europe, not a 1914 map and not approved for documentary output.
          </div>
        </div>
      </div>
      <div style={{position: "relative", height: 42, display: "flex", justifyContent: "space-between", alignItems: "end", font: "13px Arial, sans-serif", color: "#6B6255"}}>
        <span>HERR ARCHIVES · REMOTION FOUNDATION</span>
        <span>FRAME {String(frame).padStart(3, "0")} / {durationInFrames - 1} · 24 FPS</span>
      </div>
      <AbsoluteFill style={{pointerEvents: "none", opacity: 0.04, backgroundImage: "repeating-linear-gradient(0deg, transparent 0 3px, #293746 3px 4px)"}} />
      <div style={{position: "absolute", top: 134, right: 408, width: 8, height: 8, borderRadius: 20, background: PALETTE.marigold, opacity: pulse}} />
    </AbsoluteFill>
  );
};
