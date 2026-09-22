"use client";
import { useEffect } from "react";

const models={
  "tut-mask":"992c57047cdf4412b970ad798d5ad0c9",
  rosetta:"1e03509704a3490e99a173e53b93e282",
  nefertiti:"4e51f291136f4b3f8cdb44c9fbe9b1dd",
  "khafre-statue":"071b25978c054c73bd179f89c33a5ffe",
  ramesses:"4fdb2b2cb9e14f12ac7c11f385ce0104"
};

export default function ArtifactModal({artifact,onClose}){
  useEffect(()=>{if(!artifact)return;const onKey=e=>e.key==="Escape"&&onClose();document.addEventListener("keydown",onKey);const previous=document.activeElement;return()=>{document.removeEventListener("keydown",onKey);previous?.focus?.()}},[artifact,onClose]);
  if(!artifact)return null;
  const model=models[artifact.id];
  const search=`https://sketchfab.com/3d-models?features=downloadable&q=${encodeURIComponent(artifact.title)}`;
  return <div className="modal" role="presentation" onMouseDown={e=>e.target===e.currentTarget&&onClose()}>
    <section className="modalCard" role="dialog" aria-modal="true" aria-labelledby="artifact-title">
      <button className="close" type="button" onClick={onClose} aria-label="Close artifact details">×</button>
      <div className="artifactViewer">
        {model?<iframe title={`Interactive 3D model of ${artifact.title}`} src={`https://sketchfab.com/models/${model}/embed?autospin=1&autostart=1&preload=1`} allow="autoplay; fullscreen; xr-spatial-tracking" allowFullScreen/>:
        <div className="modelUnavailable"><div className="modelGlyph">◇</div><strong>3D model research view</strong><p>A verified public 3D scan for this exact object is not currently attached to the museum catalog.</p><a href={search} target="_blank" rel="noreferrer">Explore matching 3D models ↗</a></div>}
        <small>{model?"Interactive 3D model · rotate, zoom and inspect":"3D availability is checked separately for each catalog object."}</small>
      </div>
      <p className="eyebrow">{artifact.type} · {artifact.era}</p><h2 id="artifact-title">{artifact.title}</h2><p>{artifact.text}</p>
      <div className="meta"><span>Period</span><b>{artifact.date}</b></div>
      {model&&<p className="modelCredit">Model hosted by Sketchfab. Attribution and license belong to the original model creator/museum.</p>}
    </section>
  </div>;
}