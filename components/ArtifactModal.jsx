"use client";
import { useEffect } from "react";

const models={
  narmer:"cdd70f3f6c0a4c8ab99db6ec9194f7da",
  djoser:"868a742ead1f4181bda326b37b0cd979",
  khufu:"01810314feca4415a33a51dd151eacb3",
  khafre:"3417cf251498446a92cc5ee2eea12de5",
  sphinx:"b2b6cd14feed451b9ca8a13ff1fe0ff6",
  menkaure:"d82a055805c04ec099ddd02341aa7875",
  "rah":"be699d5cd26e4c2fa831cca6651b9212",
  "reserve-head":"f3daf4418259431d8ead362378892b74",
  "khafre-statue":"071b25978c054c73bd179f89c33a5ffe",
  senusret:"eca243532f714649a3166cd6ec000705",
  mentuhotep:"a3349ff11319477283d0551b9af907ed",
  "hatshepsut-temple":"5bc88658fc5e458f8f25af8a0ac9ee7b",
  "tut-mask":"992c57047cdf4412b970ad798d5ad0c9",
  "tut-dagger":"505fdc27fc1a4fcaa0e2239fb4b36f99",
  "tut-chariots":"d29a834451014363a789edcc28ed90eb",
  nefertiti:"8c60faca6152405e9d35784efa8b9aa1",
  ramesses:"4fdb2b2cb9e14f12ac7c11f385ce0104",
  "abu-simbel":"30b16b33c6834cb9aacb6d739a0b7789",
  karnak:"55ed0dea80994647a23e75afdc0384de",
  "luxor-temple":"f66e32b85d454562a0618b3b4dcb5956",
  edfu:"05f32f1da60f4cf58f8c95adc3fbfeb9",
  philae:"3f7df78558544bf09291937b06bf3e66",
  rosetta:"1e03509704a3490e99a173e53b93e282",
  fayum:"a35b4e52b0a6433d9e7df11d6217f4e0",
  "queen-ti":"a32b591eb0b4408a86fe769fc677e43d"
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
