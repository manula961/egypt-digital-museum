"use client";

import { useEffect, useState } from "react";
import { createClient } from "../lib/supabase/client";

const emptyItem={slug:"",title:"",era:"New Kingdom",date_label:"",item_type:"",symbol:"𓂀",description:"",category_id:"",model_id:"",image_url:""};

export default function AdminPanel({role,email}) {
  const supabase=createClient();
  const [tab,setTab]=useState("items");
  const [categories,setCategories]=useState([]);
  const [items,setItems]=useState([]);
  const [form,setForm]=useState(emptyItem);
  const [editing,setEditing]=useState(null);
  const [categoryName,setCategoryName]=useState("");
  const [status,setStatus]=useState("");

  async function load(){
    const [{data:cats},{data:rows}]=await Promise.all([
      supabase.from("categories").select("*").order("name"),
      supabase.from("museum_items").select("*, categories(name)").order("created_at",{ascending:false})
    ]);
    setCategories(cats||[]); setItems(rows||[]);
  }
  useEffect(()=>{load()},[]);

  const set=(k,v)=>setForm(x=>({...x,[k]:v}));
  async function saveItem(e){
    e.preventDefault(); setStatus("Saving…");
    const payload={...form, category_id:form.category_id||null, updated_at:new Date().toISOString()};
    const result=editing
      ? await supabase.from("museum_items").update(payload).eq("id",editing)
      : await supabase.from("museum_items").insert(payload);
    if(result.error) setStatus(result.error.message);
    else { setStatus("Item saved."); setForm(emptyItem); setEditing(null); load(); }
  }
  async function removeItem(id){
    if(!confirm("Delete this museum item?")) return;
    const {error}=await supabase.from("museum_items").delete().eq("id",id);
    setStatus(error?.message||"Item deleted."); load();
  }
  async function addCategory(e){
    e.preventDefault();
    const name=categoryName.trim(); if(!name) return;
    const slug=name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
    const {error}=await supabase.from("categories").insert({name,slug});
    setStatus(error?.message||"Category added."); setCategoryName(""); load();
  }
  async function removeCategory(id){
    if(!confirm("Delete this category? Items will remain but lose this category.")) return;
    const {error}=await supabase.from("categories").delete().eq("id",id);
    setStatus(error?.message||"Category deleted."); load();
  }
  async function logout(){await supabase.auth.signOut(); location.href="/";}

  return <main className="adminPage">
    <header className="adminTop"><a className="brand" href="/"><span>𓂀</span><span><strong>EGYPT</strong><small>DIGITAL MUSEUM</small></span></a><div className="adminUser"><span>{email}</span><b>{role}</b><button className="ghost" onClick={logout}>Sign out</button></div></header>
    <section className="adminShell">
      <div className="adminIntro"><div><p className="eyebrow">CONTENT CONTROL</p><h1>Museum <em>Admin</em></h1><p>Manage the public collection with role-based access.</p></div><div className="adminStats"><b>{items.length}</b><span>items</span><b>{categories.length}</b><span>categories</span></div></div>
      <div className="adminTabs"><button className={tab==="items"?"active":""} onClick={()=>setTab("items")}>Collection items</button><button className={tab==="categories"?"active":""} onClick={()=>setTab("categories")}>Categories</button></div>
      {status && <div className="adminStatus" role="status">{status}</div>}
      {tab==="items" ? <div className="adminGrid">
        <form className="adminForm" onSubmit={saveItem}><h2>{editing?"Edit item":"Add item"}</h2>
          {["slug","title","date_label","item_type","symbol","model_id","image_url"].map(k=><label key={k}>{k.replace("_"," ")}<input value={form[k]} onChange={e=>set(k,e.target.value)} required={["slug","title"].includes(k)}/></label>)}
          <label>era<select value={form.era} onChange={e=>set("era",e.target.value)}>{["Early Dynastic","Old Kingdom","Middle Kingdom","New Kingdom","Third Intermediate Period","Ptolemaic Egypt","Roman Egypt"].map(x=><option key={x}>{x}</option>)}</select></label>
          <label>category<select value={form.category_id} onChange={e=>set("category_id",e.target.value)}><option value="">Uncategorized</option>{categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
          <label>description<textarea rows="6" value={form.description} onChange={e=>set("description",e.target.value)} required/></label>
          <div className="formActions"><button className="primary">{editing?"Update item":"Create item"}</button>{editing&&<button type="button" className="secondary" onClick={()=>{setEditing(null);setForm(emptyItem)}}>Cancel</button>}</div>
        </form>
        <div className="adminList"><h2>Collection</h2>{items.map(item=><article className="adminRow" key={item.id}><div><span>{item.categories?.name||"Uncategorized"} · {item.era}</span><h3>{item.title}</h3><p>{item.description.slice(0,120)}…</p></div><div className="rowActions"><button onClick={()=>{setEditing(item.id);setForm({...emptyItem,...item,category_id:item.category_id||""})}}>Edit</button>{role==="admin"&&<button onClick={()=>removeItem(item.id)}>Delete</button>}</div></article>)}</div>
      </div> : <div className="categoryAdmin"><form onSubmit={addCategory}><input placeholder="New category name" value={categoryName} onChange={e=>setCategoryName(e.target.value)}/><button className="primary">Add category</button></form><div className="categoryList">{categories.map(c=><article key={c.id}><div><h3>{c.name}</h3><p>{c.description||"Museum collection category"}</p></div>{role==="admin"&&<button onClick={()=>removeCategory(c.id)}>Delete</button>}</article>)}</div></div>}
    </section>
  </main>;
}
