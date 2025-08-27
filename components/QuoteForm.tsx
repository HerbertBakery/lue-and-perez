'use client';
import React, { useState } from 'react';

export default function QuoteForm() {
  const [status, setStatus] = useState<'idle'|'sending'|'ok'|'err'>('idle');
  const [msg, setMsg] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending'); setMsg('');
    const fd = new FormData(e.currentTarget);

    // honeypot
    if (fd.get('website')) { setStatus('ok'); (e.currentTarget as HTMLFormElement).reset(); return; }

    const payload: Record<string,string> = {};
    fd.forEach((v,k) => { payload[k] = String(v); });

    try {
      const r = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!r.ok) throw new Error(await r.text());
      setStatus('ok');
      (e.currentTarget as HTMLFormElement).reset();
    } catch (err: any) {
      setStatus('err'); setMsg(err?.message || 'Something went wrong');
    }
  }

  const input = { width:'100%', padding:8, border:'1px solid #ccc', borderRadius:8 } as const;
  const label = { display:'block', marginBottom:8 } as const;
  const row   = { display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 } as const;

  return (
    <form onSubmit={onSubmit} style={{ display:'grid', gap:12, marginTop:16 }}>
      <div style={row}>
        <label style={label}><div style={{fontSize:12,marginBottom:4}}>Company *</div><input name="company" required style={input} /></label>
        <label style={label}><div style={{fontSize:12,marginBottom:4}}>Contact name *</div><input name="name" required style={input} /></label>
      </div>
      <div style={row}>
        <label style={label}><div style={{fontSize:12,marginBottom:4}}>Email *</div><input type="email" name="email" required style={input} /></label>
        <label style={label}><div style={{fontSize:12,marginBottom:4}}>Phone</div><input name="phone" style={input} /></label>
      </div>
      <label style={label}><div style={{fontSize:12,marginBottom:4}}>Destination country *</div><input name="country" required style={input} /></label>
      <label style={label}><div style={{fontSize:12,marginBottom:4}}>Products/SKUs & quantities *</div><textarea name="products" required rows={4} style={{...input, resize:'vertical'} as any} /></label>
      <label style={label}><div style={{fontSize:12,marginBottom:4}}>Notes (Incoterms, target price, timeline)</div><textarea name="notes" rows={3} style={{...input, resize:'vertical'} as any} /></label>

      {/* hidden honeypot */}
      <input type="text" name="website" autoComplete="off" style={{position:'absolute',left:-10000,top:'auto',width:1,height:1,overflow:'hidden'}} />

      <button disabled={status==='sending'} style={{padding:'10px 16px',borderRadius:12,color:'#fff',background:'#0a8f77',border:'none',cursor: status==='sending'?'default':'pointer',opacity: status==='sending'?0.7:1}}>
        {status==='sending' ? 'Sending…' : 'Request a Quote'}
      </button>

      {status==='ok'  && <p style={{color:'#0a8f77'}}>Thanks! We’ll reply within 1 business day.</p>}
      {status==='err' && <p style={{color:'#b00020'}}>Couldn’t submit. {msg}</p>}
    </form>
  );
}
