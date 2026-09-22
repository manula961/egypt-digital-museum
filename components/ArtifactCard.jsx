export default function ArtifactCard({ artifact, index, onOpen }) {
  return <button className="card" type="button" onClick={()=>onOpen(artifact)} aria-label={`View details for ${artifact.title}`}>
    <div className="artifactVisual"><span aria-hidden="true">{artifact.symbol}</span><small>NO. {String(index+1).padStart(2,"0")}</small></div>
    <div className="cardBody"><p>{artifact.type} · {artifact.era}</p><h3>{artifact.title}</h3><span>{artifact.date}</span><strong>View object →</strong></div>
  </button>;
}
