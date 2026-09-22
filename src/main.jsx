import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Text3D, Center } from '@react-three/drei';
import { supabase } from '../public/supabase.js';
import './styles.css';

function Pyramid() {
  return <group>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}><planeGeometry args={[18, 18]} /><meshStandardMaterial color="#d8c7a3" roughness={1} /></mesh>
    <mesh position={[-2, 0, 0]} rotation={[0, Math.PI / 4, 0]}><coneGeometry args={[3.2, 4.8, 4]} /><meshStandardMaterial color="#b58b4b" roughness={0.82} /></mesh>
    <mesh position={[2.4, -0.25, -0.7]} rotation={[0, Math.PI / 4, 0]}><coneGeometry args={[2.1, 3.2, 4]} /><meshStandardMaterial color="#8e6a39" roughness={0.9} /></mesh>
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.35}><Center position={[0, 2.2, 0.2]}><Text3D font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json" size={0.8} height={0.08} bevelEnabled bevelSize={0.015}>EGYPT</Text3D></Center></Float>
  </group>;
}

function App() {
  const [items, setItems] = useState([]), [eras, setEras] = useState([]), [tours, setTours] = useState([]), [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState(null), [search, setSearch] = useState(''), [era, setEra] = useState('');
  const [night, setNight] = useState(false), [lang, setLang] = useState('en'), [show3d, setShow3d] = useState(false);
  const [user, setUser] = useState(null), [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    (async () => {
      const [a, e, t, q, u] = await Promise.all([
        supabase.from('artifacts').select('*').order('created_at', { ascending: false }),
        supabase.from('eras').select('*'),
        supabase.from('tours').select('*'),
        supabase.from('quiz_questions').select('*'),
        supabase.auth.getUser()
      ]);
      setItems(a.data || []); setEras(e.data || []); setTours(t.data || []); setQuestions(q.data || []);
      setUser(u.data.user || null);
      if (u.data.user) {
        const f = await supabase.from('favorites').select('artifact_id').eq('user_id', u.data.user.id);
        setFavorites(new Set((f.data || []).map(x => x.artifact_id)));
      }
    })();
  }, []);

  const filtered = useMemo(() => items.filter(i =>
    (!search || [i.title, i.description, i.era, i.dynasty, i.material].join(' ').toLowerCase().includes(search.toLowerCase())) &&
    (!era || i.era?.toLowerCase().includes(era.toLowerCase()) || i.period?.toLowerCase().includes(era.toLowerCase()))
  ), [items, search, era]);

  const toggleFav = async id => {
    if (!user) return alert('Sign in to save museum favorites.');
    if (favorites.has(id)) {
      await supabase.from('favorites').delete().eq('user_id', user.id).eq('artifact_id', id);
      setFavorites(new Set([...favorites].filter(x => x !== id)));
    } else {
      await supabase.from('favorites').insert({ user_id: user.id, artifact_id: id });
      setFavorites(new Set([...favorites, id]));
    }
  };

  const ask = () => {
    const q = prompt('Ask the Egyptologist about the collection:');
    if (!q) return;
    const term = q.toLowerCase().split(' ')[0];
    const hit = items.find(i => [i.title, i.description, i.era, i.dynasty, i.material].join(' ').toLowerCase().includes(term));
    alert(hit ? hit.title + '\n\n' + hit.description : 'Try asking about an artifact, era, dynasty, material, or discovery.');
  };

  return <div className={night ? 'app night' : 'app'} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
    <header><a className="brand" href="#top">𓂀 <span>EGYPT<small>DIGITAL MUSEUM</small></span></a>
      <nav><a href="#collection">Collection</a><a href="#timeline">Timeline</a><a href="#tours">Tours</a><a href="#learn">Learn</a></nav>
      <div className="actions"><button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}>{lang === 'en' ? 'العربية' : 'English'}</button><button onClick={() => setNight(!night)}>{night ? 'Museum by day' : 'Museum at night'}</button></div>
    </header>
    <main id="top">
      <section className="hero"><div className="hero-copy"><p className="eyebrow">A DIGITAL MUSEUM OF EGYPTIAN CIVILIZATION</p><h1>Five thousand years,<br/><em>one living archive.</em></h1><p>Explore objects, people, rituals and ideas from Egyptian history through an immersive digital collection.</p><div className="hero-actions"><a className="primary" href="#collection">Explore the collection ↗</a><button className="secondary" onClick={() => setShow3d(true)}>Enter 3D Gallery</button></div></div>
        <div className="hero-scene"><Canvas camera={{ position: [7, 4, 8], fov: 45 }}><ambientLight intensity={1.2}/><directionalLight position={[4, 7, 5]} intensity={2}/><Environment preset="sunset"/><Pyramid/><OrbitControls enableZoom={false}/></Canvas><span className="coordinate">30°03′N · 31°14′E</span></div>
      </section>
      <section className="intro-strip"><span>ARCHAEOLOGY</span><i/><span>MEMORY</span><i/><span>MYTH</span><i/><span>DAILY LIFE</span><i/><span>WRITING</span></section>
      <section id="collection" className="section"><div className="section-head"><div><p className="eyebrow">01 / COLLECTION</p><h2>Objects with a <em>story.</em></h2></div><div className="tools"><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search artifacts…"/><select value={era} onChange={e => setEra(e.target.value)}><option value="">All eras</option>{eras.map(e => <option key={e.id} value={e.name}>{e.name}</option>)}</select></div></div>
        <div className="artifact-grid">{filtered.map(i => <article className="artifact" key={i.id} onClick={() => setSelected(i)}><div className="artifact-image"><span>{i.symbol || '𓂀'}</span><button onClick={e => { e.stopPropagation(); toggleFav(i.id); }}>{favorites.has(i.id) ? '♥' : '♡'}</button></div><div><p>{i.category || 'Archive'} · {i.era}</p><h3>{lang === 'ar' && i.title_ar ? i.title_ar : i.title}</h3><span>{i.date_label}</span></div></article>)}</div>
      </section>
      <section id="timeline" className="section"><p className="eyebrow">02 / EGYPT THROUGH TIME</p><h2>Follow the <em>river of time.</em></h2><div className="timeline">{eras.map(e => <button className={era === e.name ? 'active' : ''} key={e.id} onClick={() => setEra(e.name)}><b>{e.start_year < 0 ? Math.abs(e.start_year) + ' BCE' : e.start_year}</b><span>{lang === 'ar' && e.name_ar ? e.name_ar : e.name}</span></button>)}</div></section>
      <section id="tours" className="section"><p className="eyebrow">03 / GUIDED TOURS</p><h2>Choose a <em>route.</em></h2><div className="tour-grid">{tours.map((t, i) => <button className="tour" key={t.id} onClick={() => alert(t.title + '\n\n' + t.description)}><span>0{i + 1}</span><div><h3>{t.title}</h3><p>{t.description}</p></div><b>{t.duration_minutes} min ↗</b></button>)}</div></section>
      <section id="learn" className="section learn"><div><p className="eyebrow">04 / LEARNING LAB</p><h2>Learn by <em>looking closer.</em></h2><p>Explore, compare and test your knowledge.</p><div className="learn-actions"><button onClick={() => alert('Quiz ready — ' + questions.length + ' questions in the museum knowledge base.')}>Dynasty Quiz</button><button onClick={() => items.length > 1 && setSelected(items[0])}>Compare Objects</button><button onClick={ask}>Ask the Egyptologist</button></div></div></section>
    </main><footer>EGYPT DIGITAL MUSEUM · OPEN 24 / 7 · © 2026</footer>
    {selected && <div className="modal" onClick={() => setSelected(null)}><div className="modal-card" onClick={e => e.stopPropagation()}><button className="close" onClick={() => setSelected(null)}>×</button><div className="modal-symbol">{selected.symbol || '𓂀'}</div><p className="eyebrow">{selected.category} · {selected.accession_number}</p><h2>{selected.title}</h2><p>{selected.description}</p><dl><div><dt>Period</dt><dd>{selected.period || selected.date_label}</dd></div><div><dt>Dynasty</dt><dd>{selected.dynasty || '—'}</dd></div><div><dt>Material</dt><dd>{selected.material || '—'}</dd></div><div><dt>Discovery</dt><dd>{selected.discovery_location || '—'}</dd></div><div><dt>Dimensions</dt><dd>{selected.dimensions || '—'}</dd></div></dl><blockquote>{selected.curator_note || 'Curatorial context is part of the object.'}</blockquote></div></div>}
    {show3d && <div className="modal" onClick={() => setShow3d(false)}><div className="gallery3d" onClick={e => e.stopPropagation()}><button className="close" onClick={() => setShow3d(false)}>×</button><Canvas camera={{ position: [8, 5, 10], fov: 50 }}><ambientLight intensity={1}/><pointLight position={[3, 5, 4]} intensity={30}/><Environment preset="night"/><Pyramid/><OrbitControls/></Canvas><div className="gallery-label"><p className="eyebrow">IMMERSIVE GALLERY</p><h2>Walk around the <em>monument.</em></h2><p>Drag to orbit. Scroll to zoom.</p></div></div></div>}
  </div>;
}
createRoot(document.getElementById('root')).render(<App/>);