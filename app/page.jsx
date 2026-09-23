"use client";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Navigation from "../components/Navigation";
import ArtifactCard from "../components/ArtifactCard";
import ArtifactModal from "../components/ArtifactModal";
import { artifacts, eras, timeline } from "../data/artifacts";

const MuseumScene = dynamic(()=>import("../components/MuseumScene"),{ssr:false,loading:()=> <div className="sceneFallback" aria-hidden="true">Loading 3D gallery…</div>});

const categoryMap = [
  ["Architecture","Architecture & monuments","𓉴"],
  ["Sculpture","Royal & divine sculpture","𓁐"],
  ["Royal Art","Kings, queens & royal objects","𓂀"],
  ["Funerary","Afterlife, coffins & burial art","𓋹"],
  ["Writing","Stelae, papyri & inscriptions","𓏏"],
  ["Craft","Furniture, jewelry & vessels","𓆑"]
];

export default function Home(){
  const [query,setQuery]=useState("");
  const [era,setEra]=useState("All");
  const [category,setCategory]=useState("All");
  const [night,setNight]=useState(false);
  const [selected,setSelected]=useState(null);
  const filtered=useMemo(()=>{
    const q=query.trim().toLowerCase();
    return artifacts.filter(a=>
      (era==="All"||a.era===era) &&
      (category==="All"||a.type.toLowerCase().includes(category.toLowerCase().replace("funerary","funerary").replace("craft","furniture"))) &&
      (!q||`${a.title} ${a.text} ${a.type} ${a.era}`.toLowerCase().includes(q))
    );
  },[query,era,category]);
  return <main id="top" className={night?"night":""}>
    <Navigation night={night} onToggleNight={()=>setNight(v=>!v)}/>
    <section className="hero" aria-labelledby="hero-title">
      <div className="heroCopy"><p className="eyebrow">A DIGITAL MUSEUM OF EGYPT</p><h1 id="hero-title">Walk through<br/><em>5,000 years</em><br/>of history.</h1><p className="lead">Explore masterpieces, monuments and stories from the Nile through an elegant interactive collection.</p><div className="actions"><a className="primary" href="#collection">Explore collection <span aria-hidden="true">↗</span></a><a className="secondary" href="#experience">Enter 3D gallery</a></div><div className="facts"><div><b>5,000+</b><span>years of history</span></div><div><b>6</b><span>timeline periods</span></div><div><b>{artifacts.length}</b><span>featured objects</span></div></div></div>
      <div className="heroScene"><MuseumScene/></div>
    </section>
    <section id="categories" className="section categoriesSection" aria-labelledby="categories-title"><div className="sectionHead"><div><p className="eyebrow">BROWSE BY CATEGORY</p><h2 id="categories-title">Explore by <em>object type</em>.</h2></div><p>Jump between architecture, sculpture, royal art, funerary objects, writing and Egyptian craftsmanship.</p></div><div className="categoryGrid">{categoryMap.map(([name,desc,symbol])=><button type="button" className={category===name?"categoryTile active":"categoryTile"} key={name} onClick={()=>{setCategory(category===name?"All":name);document.getElementById("collection")?.scrollIntoView({behavior:"smooth"})}}><span>{symbol}</span><strong>{name}</strong><small>{desc}</small></button>)}</div></section>
    <section id="collection" className="section" aria-labelledby="collection-title"><div className="sectionHead"><div><p className="eyebrow">THE COLLECTION</p><h2 id="collection-title">Objects that <em>speak</em>.</h2></div><p>Curated highlights from ancient Egyptian culture, architecture and writing.</p></div>
      <div className="toolbar"><label className="search"><span>Search the collection</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search the collection…" /></label><div className="filters" role="group" aria-label="Filter by era"><button type="button" className={category==="All"?"active":""} onClick={()=>setCategory("All")}>All categories</button>{categoryMap.map(([e])=><button type="button" key={e} className={category===e?"active":""} onClick={()=>setCategory(e)}>{e}</button>)}</div><div className="filters" role="group" aria-label="Filter by era">{eras.map(e=><button type="button" key={e} className={era===e?"active":""} aria-pressed={era===e} onClick={()=>setEra(e)}>{e}</button>)}</div></div>
      {filtered.length?<div className="grid">{filtered.map((a,i)=><ArtifactCard key={a.id} artifact={a} index={i} onOpen={setSelected}/>)}</div>:<div className="empty"><h3>No objects found</h3><p>Try a different search, category or era.</p><button type="button" className="secondary" onClick={()=>{setQuery("");setEra("All");setCategory("All")}}>Reset filters</button></div>}
    </section>
    <section id="timeline" className="timeline section" aria-labelledby="timeline-title"><div className="sectionHead"><div><p className="eyebrow">THE TIMELINE</p><h2 id="timeline-title">Egypt across <em>ages</em>.</h2></div></div><div className="line">{timeline.map(x=><div className="event" key={x[0]}><b>{x[0]}</b><h3>{x[1]}</h3><p>{x[2]}</p></div>)}</div></section>
    <section id="experience" className="experience section" aria-labelledby="experience-title"><div><p className="eyebrow">IMMERSIVE EXPERIENCE</p><h2 id="experience-title">See the <em>monuments</em> differently.</h2><p>Rotate the scene, zoom into the landscape and experience a Three.js-powered digital gallery directly in your browser.</p></div><div className="experienceScene"><MuseumScene compact/></div></section>
    <footer><a className="brand" href="#top"><span aria-hidden="true">𓂀</span><span><strong>EGYPT</strong><small>DIGITAL MUSEUM</small></span></a><div className="footerLinks"><a href="/admin">Admin</a><p>Built for the CyberNex digital museum experience.</p></div></footer>
    <ArtifactModal artifact={selected} onClose={()=>setSelected(null)}/>
  </main>;
}