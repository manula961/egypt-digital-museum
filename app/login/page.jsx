"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true); setError("");
    const { error } = await createClient().auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else router.push("/admin");
    setLoading(false);
  }

  return <main className="authPage"><div className="authCard">
    <a className="authBrand" href="/">𓂀 EGYPT DIGITAL MUSEUM</a>
    <p className="eyebrow">STAFF ACCESS</p>
    <h1>Museum <em>Admin</em></h1>
    <p>Sign in to manage categories, collection items and museum content.</p>
    <form onSubmit={submit}>
      <label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="email"/></label>
      <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required autoComplete="current-password"/></label>
      {error && <div className="authError" role="alert">{error}</div>}
      <button className="primary authSubmit" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</button>
    </form>
    <a className="backLink" href="/">← Return to museum</a>
  </div></main>;
}
