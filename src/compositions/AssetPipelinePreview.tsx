import React from "react";
import {AbsoluteFill, Img} from "remotion";
import {ARCHIVAL_ASSETS} from "../assets/assetRegistry";
import {PALETTE, TYPOGRAPHY} from "../brand/palette";

const assetA06 = ARCHIVAL_ASSETS.find((a) => a.id === "A06")!;
const assetA08 = ARCHIVAL_ASSETS.find((a) => a.id === "A08")!;

const AssetCard: React.FC<{asset: typeof assetA06; imageFit?: "contain" | "cover"}> = ({asset, imageFit = "contain"}) => (
  <div style={{background: PALETTE.parchment, border: `1px solid ${PALETTE.stone}`, padding: 16, display: "flex", flexDirection: "column", gap: 12}}>
    <div style={{height: 420, background: "#DED3BE", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden"}}>
      <Img src={asset.src} style={{width: "100%", height: "100%", objectFit: imageFit}} />
    </div>
    <div style={{font: "700 15px Arial, sans-serif", color: PALETTE.burgundy, letterSpacing: 1.2}}>{asset.id} · {asset.status.toUpperCase()}</div>
    <div style={{fontFamily: TYPOGRAPHY.editorial, fontSize: 25, color: PALETTE.inkNavy}}>{asset.label}</div>
    <div style={{font: "16px/1.45 Arial, sans-serif", color: "#514D45"}}>{asset.recommendedUse}</div>
    <div style={{font: "13px/1.4 Arial, sans-serif", color: "#6B6255"}}>{asset.captionStatus} {asset.rightsStatus}</div>
  </div>
);

export const AssetPipelinePreview: React.FC = () => (
  <AbsoluteFill style={{background: PALETTE.paperCream, padding: 52, color: PALETTE.inkNavy}}>
    <div style={{fontFamily: TYPOGRAPHY.display, fontSize: 20, letterSpacing: 4}}>HERR ARCHIVES · PHASE 2</div>
    <div style={{fontFamily: TYPOGRAPHY.editorial, fontSize: 48, margin: "8px 0 22px"}}>Archival asset pipeline</div>
    <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, flex: 1}}>
      <AssetCard asset={assetA06} />
      <AssetCard asset={assetA08} />
    </div>
    <div style={{marginTop: 18, padding: 18, background: PALETTE.inkNavy, color: PALETTE.paperCream, font: "15px/1.5 Arial, sans-serif"}}>
      These are supplied reference images, not automatically approved final inserts. Captions, provenance and reproduction rights remain subject to verification. The excluded Princip image and the held Čabrinović attribution are not present in this project.
    </div>
  </AbsoluteFill>
);
