import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Line,
  Marker,
  Sphere,
} from "react-simple-maps/core";
import { PALETTE } from "../brand/palette";
import type { LonLat } from "./mapTypes";

export type AtlasMapProps = {
  geography: unknown;
  routeStart: LonLat;
  routeEnd: LonLat;
  routeProgressEnd: LonLat;
  movingMarker: LonLat;
  title?: string;
  width?: number;
  height?: number;
  showFixtureWatermark?: boolean;
};

/**
 * Reusable local-data SVG map surface.
 * Historical maps must be dated, source-attributed local GeoJSON/TopoJSON.
 * Routes and pointers are always clean vector elements, never paint brushes.
 */
export const AtlasMap: React.FC<AtlasMapProps> = ({
  geography,
  routeStart,
  routeEnd,
  routeProgressEnd,
  movingMarker,
  title = "ATLAS MAP SYSTEM",
  width = 1000,
  height = 620,
  showFixtureWatermark = false,
}) => {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <ComposableMap
        width={width}
        height={height}
        projection="geoMercator"
        projectionConfig={{ center: [2, 50], scale: 520 }}
        style={{ width: "100%", height: "100%", background: PALETTE.paperCream }}
      >
        <Sphere fill="#E8DFC9" stroke="#9C927F" strokeWidth={0.8} />
        <Graticule step={[5, 5]} stroke="#BDB29E" strokeWidth={0.45} strokeOpacity={0.48} />
        <Geographies geography={geography as any}>
          {({ geographies }: { geographies: Array<any> }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={geo.properties?.fill ?? "#D8C9A9"}
                stroke="#756D60"
                strokeWidth={1.05}
                style={{
                  outline: "none",
                }}
              />
            ))
          }
        </Geographies>
        <Line
          from={routeStart as [number, number]}
          to={routeProgressEnd as [number, number]}
          stroke={PALETTE.burgundy}
          strokeWidth={4}
          strokeDasharray="9 6"
          strokeLinecap="round"
          fill="none"
        />
        <Marker coordinates={routeStart as [number, number]}>
          <circle r={7} fill={PALETTE.paperCream} stroke={PALETTE.inkNavy} strokeWidth={3} />
          <circle r={2.5} fill={PALETTE.inkNavy} />
          <text y={-16} textAnchor="middle" fill={PALETTE.inkNavy} fontSize={13} fontWeight={700}>
            ORIGIN
          </text>
        </Marker>
        <Marker coordinates={routeEnd as [number, number]}>
          <circle r={7} fill={PALETTE.paperCream} stroke={PALETTE.burgundy} strokeWidth={3} />
          <circle r={2.5} fill={PALETTE.burgundy} />
          <text y={-16} textAnchor="middle" fill={PALETTE.inkNavy} fontSize={13} fontWeight={700}>
            DESTINATION
          </text>
        </Marker>
        <Marker coordinates={movingMarker as [number, number]}>
          <circle r={10} fill={PALETTE.marigold} fillOpacity={0.9} stroke={PALETTE.inkNavy} strokeWidth={2.2} />
          <circle r={3} fill={PALETTE.inkNavy} />
        </Marker>
      </ComposableMap>
      {title ? (
        <div style={{ position: "absolute", top: 18, left: 20, padding: "9px 13px", color: PALETTE.inkNavy, background: "rgba(247,238,219,0.92)", border: `1px solid ${PALETTE.stone}`, fontFamily: "Georgia, serif", fontSize: 18, letterSpacing: 1.2 }}>
          {title}
        </div>
      ) : null}
      {showFixtureWatermark ? (
        <div style={{ position: "absolute", right: 18, bottom: 16, padding: "8px 11px", background: "rgba(41,55,70,0.92)", color: PALETTE.paperCream, font: "700 12px Arial, sans-serif", letterSpacing: 1.1 }}>
          SYNTHETIC TEST GEOMETRY · NOT HISTORICAL
        </div>
      ) : null}
    </div>
  );
};
