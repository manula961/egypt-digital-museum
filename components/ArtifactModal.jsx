"use client";
import { useEffect } from "react";

export default function ArtifactModal({ artifact, onClose }) {
  useEffect(()=>{ if(!artifact)return; const onKey=e=>e.key==="Escape"&&onClose(); document.addEventListener("keydown",onKey); const previous=document.activeElement; return()=>{document.removeEventListener("keydown",onKey);previous?.focus?.()}; },[artifact,onClose]);
  if(!artifact)return null;
  return <div className="modal" role="presentation" onMouseDown={e=>e.target===e.currentTarget&&onClose()}>
    <section className="modalCard" role="dialog" aria-modal="true" aria-labelledby="artifact-title">
      <button className="close" type="button" onClick={onClose} aria-label="Close artifact details">×</button>
      <div className="modalSymbol" aria-hidden="true">{artifact.symbol}</div>
      <p className="eyebrow">{artifact.type} · {artifact.era}</p>
      <h2 id="artifact-title">{artifact.title}</h2><p>{artifact.text}</p>
      <div className="meta"><span>Period</span><b>{artifact.date}</b></div>
    </section>
  </div>;
}
