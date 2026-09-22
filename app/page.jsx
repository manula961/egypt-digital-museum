"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";

const MuseumScene = dynamic(() => import("../components/MuseumScene"), { ssr: false });

const artifacts = [
 {title:"Mask of Tutankhamun",era:"New Kingdom",date:"c. 1323 BCE",type:"Royal Art",symbol:"𓂀",text:"The iconic funerary mask of Pharaoh Tutankhamun, a symbol of royal identity and ancient Egyptian craftsmanship."},
 {title:"Rosetta Stone",era:"Ptolemaic Egypt",date:"196 BCE",type:"Writing",symbol:"𓏏",text:"A trilingual decree whose inscriptions helped scholars unlock the writing systems of ancient Egypt."},
 {title:"Bust of Nefertiti",era:"New Kingdom",date:"c. 1345 BCE",type:"Sculpture",symbol:"𓁐",text:"A celebrated limestone portrait associated with Queen Nefertiti and the artistic world of Amarna."},
 {title:"Great Pyramid of Giza",era:"Old Kingdom",date:"c. 2560 BCE",type:"Architecture",symbol:"𓉴",text:"The largest monument at Giza and the only surviving wonder of the ancient world."}
];

const eras=["All","Old Kingdom","Middle Kingdom","New Kingdom","Ptolemaic Egypt"];

export default function Home() {
 const [query,setQuery]=useState(""), [era,setEra]=useState("All"), [night,setNight]=useState(false), [selected,setSelected]=useState(null);
 const filtered=useMemo(()=>artifacts.filter(a=>(era==="All"||a.era===era)&&(`${a.title} ${a.text} ${a.type}`.toLowerCase().includes(query.toLowerCase()))),[query,era]);
 return <main className={night?"night":""}>
  <nav className="nav"><div className="brand"><span>𓂀</span><div><strong>EGYPT</strong><small>DIGITAL MUSEUM</small></div></div><div className="navlinks"><a href="#collection">Collection</a><a href="#timeline">Timeline</a><a href="#experience">Experience</a></div><button className="ghost" onClick={()=>setNight(!night)}>{night?"Day Mode":"Museum at Night"}</button></nav>
  <section className="hero"><div className="heroCopy"><p className="eyebrow">A DIGITAL MUSEUM OF EGYPT</p><h1>Walk through<br/><em>5,000 years</em><br/>of history.</h1><p className="lead">Explore masterpieces, monuments and stories from the Nile through an elegant interactive collection.</p><div className="actions"><a className="primary" href="#collection">Explore collection <span>↗</span></a><a className="secondary" href="#experience">Enter 3D gallery</a></div><div className="facts"><div><b>5,000+</b><span>years of history</span></div><div><b>8</b><span>major eras</span></div><div><b>∞</b><span>stories to discover</span></div></div></div><div className="heroScene"><MuseumScene/></div></section>
  <section id="collection" className="section"><div className="sectionHead"><div><p className="eyebrow">THE COLLECTION</p><h2>Objects that <em>speak</em>.</h2></div><p>Curated highlights from ancient Egyptian culture, architecture and writing.</p></div><div className="toolbar"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search the collection…"/><div className="filters">{eras.map(e=><button key={e} className={era===e?"active":""} onClick={()=>setEra(e)}>{e}</button>)}</div></div><div className="grid">{filtered.map((a,i)=><article className="card" key={a.title} onClick={()=>setSelected(a)}><div className="artifactVisual"><span>{a.symbol}</span><small>NO. 0{i+1}</small></div><div className="cardBody"><p>{a.type} · {a.era}</p><h3>{a.title}</h3><span>{a.date}</span><button>View object →</button></div></article>)}</div></section>
  <section id="timeline" className="timeline section"><div className="sectionHead"><div><p className="eyebrow">THE TIMELINE</p><h2>Egypt across <em>ages</em>.</h2></div></div><div className="line">{[["3100 BCE","Early Dynastic","The unification of Upper and Lower Egypt."],["2686 BCE","Old Kingdom","The age of pyramids and monumental kingship."],["1550 BCE","New Kingdom","Egypt reaches extraordinary political and artistic power."],["332 BCE","Ptolemaic","Greek and Egyptian traditions meet in a new kingdom."],["30 BCE","Roman Egypt","Egypt becomes a province of the Roman Empire."]].map(x=><div className="event" key={x[0]}><b>{x[0]}</b><h3>{x[1]}</h3><p>{x[2]}</p></div>)}</div></section>
  <section id="experience" className="experience section"><div><p className="eyebrow">IMMERSIVE EXPERIENCE</p><h2>See the <em>monuments</em> differently.</h2><p>Rotate the scene, zoom into the landscape and experience a Three.js-powered digital gallery directly in your browser.</p></div><div className="experienceScene"><MuseumScene compact/></div></section>
  <footer><div className="brand"><span>𓂀</span><div><strong>EGYPT</strong><small>DIGITAL MUSEUM</small></div></div><p>Built for the CyberNex digital museum experience.</p></footer>
  {selected&&<div className="modal" onClick={()=>setSelected(null)}><div className="modalCard" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSelected(null)}>×</button><div className="modalSymbol">{selected.symbol}</div><p className="eyebrow">{selected.type} · {selected.era}</p><h2>{selected.title}</h2><p>{selected.text}</p><div className="meta"><span>Period</span><b>{selected.date}</b></div></div></div>}
 </main>;
}