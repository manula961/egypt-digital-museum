"use client";
import { useEffect } from "react";
const modelEmbeds={
  "tut-mask":"https://sketchfab.com/models/992c57047cdf4412b970ad798d5ad0c9/embed?autospin=1&autostart=1&preload=1",
  rosetta:"https://sketchfab.com/models/a61c7f4f81e04847930ebed04585fb50/embed?autospin=1&autostart=1&preload=1",
  ramesses:"https://sketchfab.com/models/42cc89bb3fd840d7b0356bd536379a92/embed?autospin=1&autostart=1&preload=1",
  amenhotep:"https://sketchfab.com/models/cb2ea90e64c64bcc99ae6b8dbb3429de/embed?autospin=1&autostart=1&preload=1",
  nefertiti:"https://sketchfab.com/models/4e51f291136f4b3f8cdb44c9fbe9b1dd/embed?autostart=1",
  "khafre-statue":"https://sketchfab.com/models/071b25978c054c73bd179f89c33a5ffe/embed?autostart=1"
};
export default function ArtifactModal({artifact,onClose}){
  useEffect(()=>{if(!artifact)return;const onKey=e=>e.key==="Escape"&&onClose();document.addEventListener("keydown",onKey);const previous=document.activeElement;return()=>{document.removeEventListener("keydown",onKey);previous?.focus?.()}},[artifact,onClose]);
  if(!artifact)return null;
  const model=modelEmbeds[artifact.id];
  return <div className="modal" role="presentation" onMouseDown={e=>e.target===e.currentTarget&&onClose()}>
    <section className="modalCard" role="dialog" aria-modal="true" aria-labelledby="artifact-title">
      <button className="close" type="button" onClick={onClose} aria-label="Close artifact details">×</button>
      {model?<div className="artifactViewer"><iframe title={`Interactive 3D model of ${artifact.title}`} src={model} allow="autoplay; fullscreen; xr-spatial-tracking" allowFullScreen/><small>Interactive 3D model · rotate, zoom and inspect</small></div>:<div className="modalSymbol" aria-hidden="true">{artifact.symbol}</div>}
      <p className="eyebrow">{artifact.type} · {artifact.era}</p><h2 id="artifact-title">{artifact.title}</h2><p>{artifact.text}</p>
      <div className="meta"><span>Period</span><b>{artifact.date}</b></div>
      {model&&<p className="modelCredit">3D model hosted by Sketchfab; attribution and licensing remain with the original creator or museum.</p>}
    </section>
  </div>;
}