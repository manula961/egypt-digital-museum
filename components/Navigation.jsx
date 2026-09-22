"use client";
import { useState } from "react";

export default function Navigation({ night, onToggleNight }) {
  const [open,setOpen] = useState(false);
  return <nav className="nav" aria-label="Primary navigation">
    <a className="brand" href="#top" aria-label="Egypt Digital Museum home"><span aria-hidden="true">𓂀</span><span><strong>EGYPT</strong><small>DIGITAL MUSEUM</small></span></a>
    <button className="menuButton" aria-expanded={open} aria-controls="mobile-menu" onClick={()=>setOpen(v=>!v)}>{open?"Close":"Menu"}</button>
    <div className="navlinks" id="desktop-menu"><a href="#collection">Collection</a><a href="#timeline">Timeline</a><a href="#experience">Experience</a></div>
    <button className="ghost nightToggle" onClick={onToggleNight} aria-pressed={night}>{night?"Day Mode":"Museum at Night"}</button>
    {open && <div className="mobileMenu" id="mobile-menu"><a href="#collection" onClick={()=>setOpen(false)}>Collection</a><a href="#timeline" onClick={()=>setOpen(false)}>Timeline</a><a href="#experience" onClick={()=>setOpen(false)}>Experience</a><button onClick={()=>{onToggleNight();setOpen(false)}}>{night?"Day Mode":"Museum at Night"}</button></div>}
  </nav>;
}
